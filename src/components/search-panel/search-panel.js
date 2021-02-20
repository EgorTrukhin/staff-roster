import React from 'react';
import './search-panel.css';

export default class SearchPanel extends React.Component {
  constructor () {
    super();
  };

  render () {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="Введите имя для поиска..." />
    );
  };
};
