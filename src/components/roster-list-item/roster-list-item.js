import React from 'react';

import './roster-list-item.css';

const RosterListItem = ({ ...props }) => {

  const fullName = `${props.firstName} ${props.lastName} ${props.middleName}`;
  const job = `Профессия: ${props.job}`;
  const workDates = !props.dismisDate ? `Работает с ${props.empDate}` : `Работал с ${props.empDate} по ${props.dismisDate}`

  return (
    <div className="roster-list-item">

      <span className="roster-list-item-clickzone">
        <span className="roster-list-item-name">
          { fullName }
        </span>
        <span className="roster-list-item-info">
          <p>{ job }</p>
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
