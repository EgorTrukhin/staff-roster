import React from 'react';

import './roster-list-item.css';

import EditDelButtons from '../edit-n-del-buttons';

const RosterListItem = ({ mainInfo, job, onEdit, onDelete, onShowModal }) => {
  const fullName = `${mainInfo.name.first} ${mainInfo.name.last} ${mainInfo.name.middle}`;
  const position = `Профессия: ${job.position}`;
  const workDates = !job.dismisDate ? `Работает с ${job.empDate}` : `Работал с ${job.empDate} по ${job.dismisDate}`

  return (
    <div className="roster-list-item">

      <span
        className="roster-list-item-clickzone"
        onClick={ onShowModal }
      >
        <span className="roster-list-item-name">
          { fullName }
        </span>
        <span className="roster-list-item-info">
          <p>{ position }</p>
          <p>{ workDates }</p>
        </span>
      </span>

      <EditDelButtons
        onEdit={ onEdit }
        onDelete={ onDelete }
      />

    </div>
  );
};

export default RosterListItem;
