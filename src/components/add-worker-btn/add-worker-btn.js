import React from 'react';

import './add-worker-btn.css';

export default class AddWorkerBtn extends React.Component {
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
