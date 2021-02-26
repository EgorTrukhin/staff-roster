// ПРИЛОЖЕНИЕ

import React from 'react';

import './app.css';

import AppHeader from '../app-header';
import RosterList from '../roster-list';
import SearchPanel from '../search-panel';
import WorkerStatusFilter from '../worker-status-filter';

import FormButton from '../form-button';
import WorkerForm from '../worker-form';
import WorkerInfo from '../worker-info';

import SRStorage from '../../services/local-storage-service';

// подключение хранилища
const _storage = new SRStorage();
export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      workersList: _storage.getWorkersData(),
      search: '',
      filter: 'all',
      currID: null,
      showModalWorkerInfo: false,
      showModalAddWorker: false,
      showModalEditWorker: false
    }

    // показать/закрыть модалку с информаций о сотруднике
    this.showWorkerInfo = (id) => {
      this.setState(( { showModalWorkerInfo } ) => {
        return {
          currID: id,
          showModalWorkerInfo: !showModalWorkerInfo
        };
      });
    }

    // показать/закрыть модалку с добавлением сотрудника
    this.showAddForm = () => {
      this.setState(( { showModalAddWorker } ) => {
        return {
          showModalAddWorker: !showModalAddWorker
        };
      });
    }

    // показать/закрыть модалку с редактированием сотрудника
    this.onEditWorker = (id) => {
      this.setState(( { showModalEditWorker } ) => {
        return {
          currID: id,
          showModalEditWorker: !showModalEditWorker
        };
      });
    }

    // обновление списка при добавлении/редактировании сотрудника
    this.onAdd = () => {
      const workersList = _storage.getWorkersData();
      this.setState({ workersList })
    }

    // обновление списка при удалении сотрудника
    this.onDeleteWorker = (id) => {
      this.setState(() => {
        _storage.deleteStorageItem(id);
        const workersList = _storage.getWorkersData();

        return { workersList };
      });
    };

    // обновление списка при поиске сотрудника
    this.onSearch = (search) => {
      this.setState({ search });
    };

    // обновление списка при фильтре сотрудников
    this.onFilter = (filter) => {
      this.setState({ filter });
    };

    // способ поиска
    this.search = (workersList, search) => {
      if (search.length == 0) {
        return workersList;
      }

      return workersList.filter((worker) =>
        worker.firstName.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        worker.lastName.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        worker.middleName.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
    }

    // способ фильтрации
    this.filter = (workersList, filter) => {
      if (filter == 'all') {
        return workersList;
      } else if (filter == 'stillWork') {
        return workersList.filter((worker) => worker.dismisDate === "")
      } else {
        return workersList.filter((worker) => worker.dismisDate != "")
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
            onShowModal={ this.showWorkerInfo }
            />
          <FormButton
            label="Добавить сотрудника"
            type="button"
            css="btn-primary float-right"
            onClick={ this.showAddForm }
          />
        </div>

        <WorkerForm
          currID={ this.state.currID }
          addItem={ this.onAdd }
          showModalAddWorker={ this.state.showModalEditWorker }
          closeModal={ this.onEditWorker }
        />
        <WorkerForm
          addItem={ this.onAdd }
          showModalAddWorker={ this.state.showModalAddWorker }
          closeModal={ this.showAddForm }
        />
        <WorkerInfo
          showModalWorkerInfo={ this.state.showModalWorkerInfo }
          onEdit={ this.onEditWorker }
          onDelete={ this.onDeleteWorker }
          closeModal={ this.showWorkerInfo }
          currID={ this.state.currID }
        />
      </div>
    );
  }
};
