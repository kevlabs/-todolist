import React, { useCallback, useState } from 'react';
import Modal from './Modal';
import moment from 'moment';

export default function EditModal({ isOpen, setIsOpen, task, taskDispatch, taskActions }) {

  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [dueAt, setDueAt] = useState(moment(task.dueAt).format(moment.HTML5_FMT.DATETIME_LOCAL));

  const updateTask = useCallback((task) => {
    taskDispatch({ type: taskActions.UPDATE, payload: task });
  }, [taskDispatch, taskActions]);

  // should be made a helper fn
  const handleChange = useCallback((setState) => {
    return (e) => {
      e.preventDefault();
      setState(e.currentTarget.value);
    }
  }, []);

  // no need to memoize as is dependent on form data
  const handleSubmit = (e) => {
    console.log('calling submit');
    
    e.preventDefault();
    const editedTask = { ...task, name, description, dueAt: moment(dueAt, moment.HTML5_FMT.DATETIME_LOCAL).toDate() };

    // mock axios request
    new Promise((resolve, reject) => {
      // simulate delay (2s)
      setTimeout(() => resolve({ data: editedTask }), 2000);
    })
      .then(({ data: task }) => {
        updateTask(task);
        setIsOpen(false);
      })
      .catch((err) => console.log('Error while updating task'));

  };
  
  return (
    <Modal {...{ isOpen, setIsOpen, title: `Edit Task: ${name}` }}>
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <label>Name
          <input name="name" type="text" value={name} onChange={handleChange(setName)} required />
        </label>
        <label>Description
          <textarea name="description" value={description} onChange={handleChange(setDescription)} />
        </label>
        <label>Finish by
          <input name="dueat" type="datetime-local" value={dueAt} onChange={handleChange(setDueAt)} required />
        </label>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </Modal>
  );

}