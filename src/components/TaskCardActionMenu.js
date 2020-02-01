import React, { useCallback, useState } from 'react';
import ActionMenu from './ActionMenu';
import ActionMenuItem from './ActionMenuItem';
import EditModal from './EditModal';

export default function TaskCardActionMenu({ task, taskDispatch, taskActions }) {

  const [isEditOpen, setIsEditOpen] = useState(false);

  const setStatus = useCallback((status) => {
    taskDispatch({ type: taskActions.SET_STATUS, payload: { id: task.id, status } });
  }, [task, taskDispatch, taskActions]);

  const markDeleted = useCallback((e) => {
    e.preventDefault();
    taskDispatch({ type: taskActions.SET_DELETED, payload: { id: task.id, isDeleted: true } });
  }, [task, taskDispatch, taskActions])

  const markStarted = useCallback((e) => {
    e.preventDefault();
    setStatus('Started');
  }, [setStatus]);

  const markCompleted = useCallback((e) => {
    e.preventDefault();
    setStatus('Completed');
  }, [setStatus]);

  const openEdit = useCallback((e) => {
    e.preventDefault();
    setIsEditOpen(true);
  }, [setIsEditOpen]);
  
  return (
    <>
      {isEditOpen && <EditModal {...{ isOpen: isEditOpen, setIsOpen: setIsEditOpen, task, taskDispatch, taskActions }} />}
      <ActionMenu classNamePrefix="task-card__header-">
        {task.status === 'Not started' && <ActionMenuItem onClick={markStarted}>Start</ActionMenuItem>}
        {task.status === 'Started' && <ActionMenuItem onClick={markCompleted}>Mark Complete</ActionMenuItem>}
        <hr />
        <ActionMenuItem onClick={(e) => { e.preventDefault(); alert('Set Reminder'); }}>Set Reminder</ActionMenuItem>
        <hr />
        <ActionMenuItem onClick={openEdit}>Edit Task</ActionMenuItem>
        <ActionMenuItem onClick={markDeleted}>Delete</ActionMenuItem>
      </ActionMenu>
    </>
  );

}