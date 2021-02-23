import React from 'react';

import './roster-list-item.css';

const RosterListItem = ({ mainInfo, job }) => {
  const fullName = `${mainInfo.name.first} ${mainInfo.name.last} ${mainInfo.name.middle}`;
  const position = `Профессия: ${job.position}`;
  const workDates = !job.dismisDate ? `Работает с ${job.empDate}` : `Работал с ${job.empDate} по ${job.dismisDate}`

  return (
    <div className="roster-list-item">

      <span className="roster-list-item-clickzone">
        <span className="roster-list-item-name">
          { fullName }
        </span>
        <span className="roster-list-item-info">
          <p>{ position }</p>
          <p>{ workDates }</p>
        </span>
      </span>
      <span className="roster-list-item-btns">
        <button
          type="button"
          className="btn btn-outline-success btn-sm"
          title="Редактировать">
            <i className="fa fa-pencil"></i>
        </button>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          title="Удалить">
            <i className="fa fa-trash-o"></i>
        </button>
      </span>
    </div>
  );
};

export default RosterListItem;
