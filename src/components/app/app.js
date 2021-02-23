import React from 'react';

import './app.css';

import AppHeader from '../app-header';
import RosterList from '../roster-list';
import SearchPanel from '../search-panel';
import WorkerStatusFilter from '../worker-status-filter';

import FormButton from '../form-button';
import AddWorkerForm from '../add-worker-form';
import WorkerInfo from '../worker-info';

import SRStorage from '../../services/local-storage-service';

export default class App extends React.Component {
  constructor() {
    super();

    this._storage = new SRStorage();

    this.state = {
      workersList: this._storage.getWorkersData(),
      search: '',
      filter: 'all'
    }

    this.onDeleteWorker = (id) => {
      console.log(id);
      this.setState((state) => {
        this._storage.deleteStorageItem(id);
        const workersList = this._storage.getWorkersData();

        return { workersList };
      });
    };

    this.onSearch = (search) => {
      this.setState({ search });
    };

    this.onFilter = (filter) => {
      this.setState({ filter });
    };

    this.search = (workersList, search) => {
      if (search.length == 0) {
        return workersList;
      }

      return workersList.filter((worker) =>
        worker.mainInfo.name.first.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        worker.mainInfo.name.last.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        worker.mainInfo.name.middle.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
    }

    this.filter = (workersList, filter) => {
      if (filter == 'all') {
        return workersList;
      } else if (filter == 'stillWork') {
        return workersList.filter((worker) => worker.job.dismisDate === null)
      } else {
        return workersList.filter((worker) => worker.job.dismisDate != null)
      }
    }
  }

  render() {
    const { workersList, search, filter } = this.state;
    const visibleWorkers = this.filter(this.search(workersList, search), filter)

    return (
      <div className="staff-roster-app card border-light mb-3">
        <div className="card-header">
          <AppHeader count={ workersList.length }/>
        </div>
        <div className="card-body">
          <div className="top-panel d-flex">
            <SearchPanel onSearch={ this.onSearch }/>
            <WorkerStatusFilter
              filter={ filter }
              onFilter={ this.onFilter }
            />
          </div>
          <RosterList
            workers={ visibleWorkers }
            onEdit={ this.onEditWorker }
            onDelete={ this.onDeleteWorker }
            />
          <FormButton
            label="Добавить сотрудника"
            type="button"
            css="btn-primary float-right"
          />
        </div>

        <AddWorkerForm />
        <WorkerInfo />
      </div>
    );
  }
};
