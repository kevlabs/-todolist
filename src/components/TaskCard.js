import React from 'react';
import ActionMenu from './TaskCardActionMenu';
import './TaskCard.scss';

export default function TaskCard({ task, taskDispatch }) {
  console.log('TASK', task);
  

  return (
    <article className="task-card">
      <header className="task-card__header">
        <ActionMenu {...{ task, taskDispatch }} />
        <h2>{task.name}</h2>
        <p>Due in 2 days - {task.dueAt.toString()}</p>
      </header>
      <div className="task-card__body">
        <p>{task.description}</p>
      </div>
    </article>
  );

}