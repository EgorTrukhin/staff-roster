import React from 'react';

import './edit-n-del-buttons.css';

const EditDelButtons = ( { onEdit, onDelete } ) => {

  return (
    <div>
      <button
        onClick= { onEdit }
        type="button"
        className="btn btn-outline-success btn-sm roster-list-item-btn"
        title="Редактировать">
          <i className="fa fa-pencil"></i>
      </button>
      <button
        onClick= { onDelete }
        type="button"
        className="btn btn-outline-danger btn-sm roster-list-item-btn"
        title="Удалить">
          <i className="fa fa-trash-o"></i>
      </button>
    </div>
  );
}

export default EditDelButtons;
