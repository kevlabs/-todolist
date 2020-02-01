import React from 'react';
import ActionMenu from './TaskCardActionMenu';
import moment from 'moment';
import './TaskCard.scss';

export default function TaskCard({ task, taskDispatch, taskActions }) {
  console.log('TASK', task);
  

  return (
    <article className="task-card">
      <header className="task-card__header">
        <ActionMenu {...{ task, taskDispatch, taskActions }} />
        <h2>{task.name}</h2>
        <p>{task.status} - Due {moment(task.dueAt).fromNow()}</p>
      </header>
      <div className="task-card__body">
        <p>{task.description}</p>
      </div>
    </article>
  );

}