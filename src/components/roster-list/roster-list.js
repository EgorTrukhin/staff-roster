import React from 'react';

import RosterListItem from '../roster-list-item'
import './roster-list.css';

// СПИСОК СОТРУДНИКОВ
const RosterList = ( { workers, onEdit, onDelete, onShowModal } ) => {
  const listItems = workers.map(
    (item) => {
      const { id, ...itemProps } = item
      return (
        <li key={ id } className="list-group-item">
          <RosterListItem
            onEdit = { () => onEdit(id) }
            onDelete = { () => onDelete(id) }
            onShowModal = { () => onShowModal(id) }
            props={ itemProps }
          />
        </li>
      );
    }
  );

  return (
    <ul className="list-group roster-list">
      { listItems }
    </ul>
  );
};

export default RosterList;
