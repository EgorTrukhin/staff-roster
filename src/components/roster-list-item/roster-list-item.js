import React from 'react';

import './roster-list-item.css';
import EditDelButtons from '../edit-n-del-buttons';

// ЭЛЕМЕНТ СПИСКА СОТРУДНИКОВ ПРИЛОЖЕНИЯ
const RosterListItem = ({ props, onEdit, onDelete, onShowModal }) => {
  const fullName = `${props.lastName} ${props.firstName} ${props.middleName}`;
  const position = `Должность: ${props.position}`;
  const workDates = !props.dismisDate ?
  `Работает с ${props.empDate}` : `Работал с ${props.empDate} по ${props.dismisDate}`

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
