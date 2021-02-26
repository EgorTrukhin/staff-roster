import React from 'react';
import './app-header.css';

// ШАПКА ПРИЛОЖЕНИЯ
const AppHeader = ( { count } ) => {
  return (
    <div className="d-flex app-header">
      <h1>Реестр сотрудников</h1>
      <h2>Всего сотрудников: { count }</h2>
    </div>
  );
};

export default AppHeader;
