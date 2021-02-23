import React from 'react';

import './worker-status-filter.css';

export default class WorkerStatusFilter extends React.Component {
  constructor() {
    super();

    this.buttons = [
      {name: 'all', label: 'Все'},
      {name: 'stillWork', label: 'Работают'},
      {name: 'dismissed', label: 'Уволены'}
    ];
  }

  render() {
    const { filter, onFilter } = this.props;
    const btns = this.buttons.map(( {name, label} ) => {
      const isActive = name == filter;
      const className = isActive ? "btn-info" : "btn-outline-info";

      return (
        <button type="button"
                className={ `btn ${ className }` }
                key={ name }
                onClick={ () => onFilter(name) }>
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
