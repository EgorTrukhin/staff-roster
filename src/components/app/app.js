import React from 'react';

import './app.css';

import AppHeader from '../app-header';
import RosterList from '../roster-list';
import SearchPanel from '../search-panel';
import WorkerStatusFilter from '../worker-status-filter';
import AddWorkerBtn from '../add-worker-btn';

import AddWorkerForm from '../add-worker-form';
import WorkerInfo from '../worker-info';

import SRStorage from '../../services/local-storage-service';

export default class App extends React.Component {
  constructor() {
    super();

    this._storage = new SRStorage();

    this.workersList = this._storage.getWorkersData()
  }

  render() {
    return (
      <div className="staff-roster-app card border-light mb-3">
        <div className="card-header">
          <AppHeader count={ this.workersList.length }/>
        </div>
        <div className="card-body">
          <div className="top-panel d-flex">
            <SearchPanel />
            <WorkerStatusFilter />
          </div>
          <RosterList workers={ this.workersList }/>
          <AddWorkerBtn />
        </div>

        <AddWorkerForm />
        <WorkerInfo />
      </div>
    );
  }
};
