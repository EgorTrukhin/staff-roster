import React from 'react';

import './app.css';

import AppHeader from '../app-header';
import RosterList from '../roster-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import AddItemForm from '../add-item-form';

const App = () => {
  const workersList = [
    {
      id: 1,
      firstName: "Иванов",
      lastName: "Иван",
      middleName: "Иваныч",
      job: "Frontend",
      birthDay: "04.11.1982",
      sex: "male",
      empDate: "12.02.2006",
      dismisDate: NaN,
      hasDriveLicense: true
    },
    {
      id: 2,
      firstName: "Петров",
      lastName: "Петр",
      middleName: "Петрович",
      job: "Backend",
      birthDay: "17.04.1976",
      sex: "male",
      empDate: "19.06.2004",
      dismisDate: "06.10.2012",
      hasDriveLicense: true
    },
    {
      id: 3,
      firstName: "Ержов",
      lastName: "Ержан",
      middleName: "Ержаныч",
      job: "Fullstack",
      birthDay: "15.09.1985",
      sex: "male",
      empDate: "08.10.2012",
      dismisDate: NaN,
      hasDriveLicense: false
    }
  ];

  return (
    <div className="staff-roster-app card border-light mb-3">
      <div className="card-header">
        <AppHeader />
      </div>
      <div className="card-body">
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <RosterList workers={ workersList }/>
        <AddItemForm />
      </div>
    </div>
  );
};

export default App;
