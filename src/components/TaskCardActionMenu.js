import React, { useCallback } from 'react';
import ActionMenu from './ActionMenu';
import ActionMenuItem from './ActionMenuItem';

export default function TaskCardActionMenu({ task, dispatchTask }) {

  // Stated, Not started, Completed
  const setStatus = useCallback((status) => {
    dispatchTask({ action: 'SET_STATUS', payload: { id: task.id, status } });
  }, [task, dispatchTask])

  // Stated, Not started, Completed
  const markDeleted = useCallback((e) => {
    e.preventDefault();
    dispatchTask({ action: 'SET_DELETED', payload: { id: task.id, isDeleted: true } });
  }, [task, dispatchTask])

  const markStarted = useCallback((e) => {
    e.preventDefault();
    setStatus('Started');
  }, [setStatus]);

  const markCompleted = useCallback((e) => {
    e.preventDefault();
    setStatus('Completed');
  }, [setStatus]);
  
  return (
    <ActionMenu classNamePrefix="task-card__header-">
      {task.status === 'Not started' && <ActionMenuItem onClick={markStarted}>Start</ActionMenuItem>}
      {task.status === 'Started' && <ActionMenuItem onClick={markCompleted}>Mark Complete</ActionMenuItem>}
      <hr />
      <ActionMenuItem onClick={(e) => { e.preventDefault(); alert('Set Reminder'); }}>Set Reminder</ActionMenuItem>
      <hr />
      <ActionMenuItem onClick={(e) => { e.preventDefault(); alert('Edit'); }}>Edit Task</ActionMenuItem>
      <ActionMenuItem onClick={markDeleted}>Delete</ActionMenuItem>
    </ActionMenu>
  );

}