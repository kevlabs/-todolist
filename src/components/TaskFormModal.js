import React, { useCallback, useState } from 'react';
import Modal from './Modal';
import moment from 'moment';

// returns form input handler
function handleChange(setState) {
  return (e) => {
    e.preventDefault();
    setState(e.currentTarget.value);
  }
}

export default function TaskFormModal({ isOpen, setIsOpen, task, taskDispatch, taskActions }) {

  const isEdit = task !== undefined;

  const [error, setError] = useState('');
  const [isFormLocked, setIsFormLocked] = useState(false);
  const [name, setName] = useState(isEdit ? task.name : '');
  const [description, setDescription] = useState(isEdit ? task.description : '');
  const [dueAt, setDueAt] = useState(isEdit ? moment(task.dueAt).format(moment.HTML5_FMT.DATETIME_LOCAL) : moment.HTML5_FMT.DATETIME_LOCAL);

  const clearError = useCallback(() => {
    setError('');
  }, [])

  const addTask = useCallback((task) => {
    taskDispatch({ type: taskActions.ADD, payload: task });
  }, [taskDispatch, taskActions]);

  const updateTask = useCallback((task) => {
    taskDispatch({ type: taskActions.UPDATE, payload: task });
  }, [taskDispatch, taskActions]);

  // reset form to db task values
  const handleReset = (e) => {
    e.preventDefault();
    clearError();

    setName(isEdit ? task.name : '');
    setDescription(isEdit ? task.description : '');
    setDueAt(isEdit ? moment(task.dueAt).format(moment.HTML5_FMT.DATETIME_LOCAL) : moment.HTML5_FMT.DATETIME_LOCAL);
  };

  // no need to memoize as is dependent on form data
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormLocked(true);
    clearError();

    const parsedDueAt = moment(dueAt, moment.HTML5_FMT.DATETIME_LOCAL).toDate();

    try {
      // validate form
      if (!name) throw Error('Name cannot be blank!');
      if (parsedDueAt < Date.now()) throw Error('The task due date must be in the future!');

    } catch (err) {
      // print error message and release form
      setError(err.message);
      setIsFormLocked(false);
      return;
    }

    const submittedTask = { ...task, name, description, dueAt: parsedDueAt };

    // mock axios request
    new Promise((resolve, reject) => {
      // simulate delay (2s)
      setTimeout(() => resolve({ data: submittedTask }), 2000);
    })
      .then(({ data: task }) => {
        isEdit ? updateTask(task) : addTask(task);
        setIsOpen(false);
      })
      .catch((err) => setError(`Error while ${isEdit ? 'updating' : 'creating'} task`))
      .finally(() => setIsFormLocked(false));

  };
  
  return (
    <Modal {...{ isOpen, setIsOpen, title: `${isEdit ? 'Edit' : 'New'} Task${name ? `: ${name}` : ''}` }}>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <label htmlFor="task-name">Name</label>
        <input name="name" id="task-name" type="text" value={name} placeholder="Enter the task name..." onChange={handleChange(setName)} required />
        <label htmlFor="task-description">Description</label>
        <textarea name="description" id="task-description" value={description} placeholder="Enter a brief description..." rows={5} onChange={handleChange(setDescription)} />
        <label htmlFor="task-dueat">Finish by</label>
        <input name="dueat" id="task-dueat" type="datetime-local" value={dueAt} onChange={handleChange(setDueAt)} required />
        <button type="submit" disabled={isFormLocked}>Submit</button>
        <button type="reset" disabled={isFormLocked}>Reset</button>
      </form>
    </Modal>
  );

}