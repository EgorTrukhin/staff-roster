import React from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends React.Component {
  constructor() {
    super();

    this.buttons = [
      {name: 'all', label: 'Все'},
      {name: 'stillWork', label: 'Работает'},
      {name: 'dismissed', label: 'Уволен'}
    ];
  }

  render() {
    const btns = this.buttons.map(( {name, label} ) => {
      return (
        <button type="button"
                className="btn btn-outline-info btn-sm"
                key={ name }>
                { label }
        </button>
      );
    });

    return (
      <div className="btn-group">
        { btns }
      </div>
    );
  }
}
