import React from 'react';
import FormButton from '../form-button';
import SRStorage from '../../services/local-storage-service';
import './add-worker-form.css';

export default class AddWorkerForm extends React.Component {
  constructor() {
    super();

    this._storage = new SRStorage();

    this.positions = this._storage
        .getPositions()
        .map((pos, idx) => {
          return (
            <option key={ idx }>{ pos }</option>
          )
        });
  };

  render() {
    return (
      <div className="modal">
        <div className="modal-dialog" role="document">
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Добавить нового сотрудника</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Данные ФИО</label>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Фамилия" />
                  <input type="text" className="form-control" placeholder="Имя" />
                  <input type="text" className="form-control" placeholder="Отчество" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="job-select">Должность</label>
                <select className="custom-select" id="job-select">
                  { this.positions }
                </select>
              </div>

              <div className="form-group">
                <legend>Пол</legend>
                <div className="custom-control custom-checkbox">
                  <input type="radio" className="custom-control-input" name="optionsSex" id="optionMale" value="male" defaultChecked/>
                  <label className="custom-control-label" htmlFor="optionMale">Мужской</label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input type="radio" className="custom-control-input" name="optionsSex" id="optionFemale" value="female"/>
                  <label className="custom-control-label" htmlFor="optionFemale">Женский</label>
                </div>
              </div>

              <div className="form-group">
                <legend>Наличие прав</legend>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="noLic" defaultChecked/>
                  <label className="custom-control-label" htmlFor="noLic">Нет</label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="cat-A"/>
                  <label className="custom-control-label" htmlFor="cat-A">Категория А</label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="cat-B"/>
                  <label className="custom-control-label" htmlFor="cat-B">Категория В</label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="cat-C"/>
                  <label className="custom-control-label" htmlFor="cat-C">Категория С</label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <FormButton
                label="Добавить"
                type="submit"
                css="btn-sm btn-primary"
              />
              <FormButton
                label="Отменить"
                type="button"
                css="btn-sm btn-outline-secondary"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
