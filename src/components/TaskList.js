import React, { useEffect, useReducer } from 'react';
import TaskCard from './TaskCard';

// SAMPLE DATA
const sampleTasks = [
  {
    id: 1,
    name: 'Task 1',
    description: 'Small description',
    status: 'Not started',
    dueAt: new Date(Date.now() + 1000 * 60 * 60) // 1 hour from now
  },
  {
    id: 2,
    name: 'Task 2',
    description: 'Small description 2',
    status: 'Not started',
    dueAt: new Date(Date.now() + 1000 * 60 * 120) // 2 hours from now
  }
];


// to be lifted as there will eventually be multiple task list based on status
// action types enum
const taskActions = {
  DATA: 0,
  ADD: 1,
  SET_STATUS: 2,
  SET_DELETED: 3,
  RESET: 4,
};

// payload is an array of tasks ordered based on due date (soonest first)
function taskDataReducer(state, payload) {
  const [order, tasks] = payload.reduce(([order, tasks], task) => {
    order.push(task.id);
    tasks[task.id] = task;
    return [order, tasks];
  }, [[], {}]);

  return {
    ...state,
    tasks,
    order
  };

}

function taskAddReducer(state, payload) {
  // need to find out where to place the task within existing tasks based on due date
  const order = state.order.reduce((order, id) => {
    // insert new task id in order when a task with a later due date is found
    state.tasks[id].dueAt > payload.dueAt && order.push(payload.id);
    order.push(id);
    return order;
  }, []);

  const tasks = { ...state.tasks, [payload.id]: payload };

  return {
    ...state,
    tasks,
    order,
  };
}

function taskSetStatusReducer(state, payload) {

  const task = { ...state.tasks[payload.id], status: payload.status };
  const tasks = { ...state.tasks, [task.id]: task };

  return {
    ...state,
    tasks,
  };
}

function taskSetDeletedReducer(state, payload) {

  const order = state.order.reduce((order, id) => {
    // push task into new order array if id not that of task being deleted
    id !== payload.id && order.push(id);
    return order;
  }, []);

  // extract other tasks from state
  const { [payload.id]: _, tasks } = state.tasks;

  return {
    ...state,
    tasks,
    order,
  };
}

const taskInitialState = {
  tasks: {},
  order: []
};

function taskReducer(state, { type, payload }) {
  switch (type) {
    case taskActions.DATA:
      return taskDataReducer(state, payload);

    case taskActions.ADD:
      return taskAddReducer(state, payload);

    case taskActions.SET_STATUS:
      return taskSetStatusReducer(state, payload);

    case taskActions.SET_DELETED:
      return taskSetDeletedReducer(state, payload);

    default:
      throw Error(`Tried to reduce with unsupported action of type ${type}.`);
  }
}

export default function TaskList() {

  // state reducer
  const [taskState, taskDispatch] = useReducer(taskReducer, taskInitialState);

  // fetch task data when component mounts
  useEffect(() => {
    // mock axios request
    new Promise((resolve, reject) => {
      // simulate delay (2s)
      setTimeout(() => resolve({ data: sampleTasks }), 2000);
    })
      .then(({ data: payload }) => {
        taskDispatch({ type: taskActions.DATA, payload });
      })
      .catch((err) => console.log('Error while fetching task data'));

  }, []);
  
  console.log('STATE', taskState);
  

  return (
    <div>
      {taskState.order.map((id) => {
        const task = taskState.tasks[id];
        return <TaskCard {...{ key: task.id, task, taskDispatch }} />;
      })}
    </div>
  );

}