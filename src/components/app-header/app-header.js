import React from 'react';
import './app-header.css';

const AppHeader = ( { count } ) => {
  return (
    <div className="d-flex app-header">
      <h1>Реестр сотрудников</h1>
      <h2>Всего сотрудников: { count }</h2>
    </div>
  );
};

export default AppHeader;
