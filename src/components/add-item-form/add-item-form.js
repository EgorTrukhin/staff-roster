import React from 'react';

import './add-item-form.css';

export default class AddItemForm extends React.Component {
  constructor() {
    super();

  };

  render() {
    return (
        <button
          className="btn btn-primary float-right add-btn">
            Добавить сотрудника
        </button>
    );
  }
}
