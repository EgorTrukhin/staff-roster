// ФОРМА ДЛЯ РЕДАКТИРОВАНИЯ ИЛИ ДОБАВЛЕНИЯ СОТРУДНИКА

import React from 'react';

import './worker-form.css';

import Modal from '../modal';
import FormButton from '../form-button';

import SRStorage from '../../services/local-storage-service';
const _storage = new SRStorage();

// проверка валидности формы перед отправкой
const formValid = ({ formErrors, ...props }) => {
  return Object.values(formErrors).every(err => err.length < 1)
        && !Object.values(props).some(prop => prop === null);
}

// получение нового id для добавления сотрудника в хранилище
const getNewId = () => {
  const ids = _storage.getWorkersIds();
  return _storage.generateNewId(ids[ids.length - 1]);
}

// регулярное выражения для проверки ввода ФИО
const nameRegex = RegExp(/^[а-яА-Я]+[^a-zA-Z0-9]$/);

export default class WorkerForm extends React.Component {
  constructor() {
    super();

    this.state = {
      id: getNewId(),
      firstName: null,
      lastName: null,
      middleName: null,
      birthDay: null,
      sex: "male",
      hasDriveLicense: false,
      position: _storage.getPositions()[0],
      empDate: null,
      dismisDate: "",
      formErrors: {
        firstName: "",
        lastName: "",
        middleName: ""
      },
      formValid: true,
      editing: false
    }
  };

  // приготовление перед отправкой формы
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    // если форма валидна
    if(formValid(this.state)) {
      const worker = {
        id: this.state.id,
        lastName: this.state.lastName,
        firstName: this.state.firstName,
        middleName: this.state.middleName,
        birthDay: this.state.birthDay,
        sex: this.state.sex,

        hasDriveLicense: this.state.hasDriveLicense,
        position: this.state.position,
        empDate: this.state.empDate,
        dismisDate: this.state.dismisDate
      }

      _storage.setWorker(worker);

      this.setState(() => {
        return {
          id: getNewId(),
          firstName: null,
          lastName: null,
          middleName: null,
          birthDay: null,
          sex: "male",
          hasDriveLicense: false,
          position: _storage.getPositions()[0],
          empDate: null,
          dismisDate: "",
          formErrors: {
            firstName: "",
            lastName: "",
            middleName: "",
            dismisDate: ""
          },
          formValid: true,
          editing: false
        }
      })

      this.props.closeModal();
      this.props.addItem();
    }
    // если форма невалидна
    else {
      this.setState(() => {
        return {
          formValid: false
        }
      })
    }
  }

  // при закрытии формы стирать данные из стейта
  handleClose = (event) => {
    this.setState(() => {
      return {
        editing: false
      }
    })
    this.props.closeModal();
  }

  // проверка и заполнение стейта при вводе данных в форму
  handleChange = (event) => {
    let { name, value } = event.target;
    let formErrors = this.state.formErrors;
    console.log(this.state);
    switch (name) {
      case "firstName":
        formErrors.firstName = nameRegex.test(value) || value.length === 0 ? "" : "Неверный синтаксис!";
        break;
      case "lastName":
        formErrors.lastName = nameRegex.test(value) || value.length === 0 ? "" : "Неверный синтаксис!";
        break;
      case "middleName":
        formErrors.middleName = nameRegex.test(value) || value.length === 0 ? "" : "Неверный синтаксис!";
        break;
      case "empDate":
        formErrors.dismisDate = value > this.state.empDate || value.length === 0 ? "" : "Дата увольнения должная быть позже даты приема";
        break;
      case "dismisDate":
        formErrors.dismisDate = value > this.state.empDate || value.length === 0 ? "" : "Дата увольнения должная быть позже даты приема";
        break;
      case "hasDriveLicense":
        value = event.target.checked;
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value })
  }

  // заполнение формы имеющимися данными при редактировании сотрудника
  componentDidUpdate() {
    const { editing } = this.state;
    if (typeof this.props.currID === "number" && !this.state.editing) {
      const worker = _storage.getStorageItem(this.props.currID);

      this.setState(() => {
        return {
          id: this.props.currID,
          firstName: worker.firstName,
          lastName: worker.lastName,
          middleName: worker.middleName,
          birthDay: worker.birthDay,
          sex: worker.sex,
          hasDriveLicense: worker.hasDriveLicense,
          position: worker.position,
          empDate: worker.empDate,
          dismisDate: worker.dismisDate,
          editing: !editing
        }
      })
    }
  }

  render() {
    const { showModalAddWorker } = this.props;

    // получение всех должностей из хранилища
    const positions = _storage
        .getPositions()
        .map((pos, idx) => {
          return (
            <option key={ idx }>{ pos }</option>
          )
        });

    const { formErrors, editing } = this.state;

    // поле Дата увольнения сотрудника (добавляется в форму только при редактировании)
    const dismisDate = (
    <div className="form-group">
      <legend>Дата увольнения</legend>
      <div className="form-group">
        <input
          noValidate
          onChange={ this.handleChange }
          name="dismisDate"
          type="date"
          className={
            `form-control
            ${ formErrors.dismisDate ? "is-invalid" : "" }`
          }
          placeholder="Выберите дату" />
        {
          formErrors.dismisDate ?
          <span className="invalid-input">{ formErrors.dismisDate }</span> : null
        }
      </div>
    </div>);

    // конструирование формы в соответсвие с вход. парам.
    const children = {
      title: editing ? "Редактировать сотрудника" :"Добавить нового сотрудника",
      body: (
        <>
        <div className="form-group">
          <legend>Данные ФИО:</legend>
          <div className="form-group">
            <input
              value={ this.state.lastName ? this.state.lastName : "" }
              noValidate
              onChange={ this.handleChange }
              type="text"
              name="lastName"
              className={
                `form-control
                ${ formErrors.lastName.length > 0 ? "is-invalid" : "" }`
              }
              placeholder="Фамилия" />
            {
              formErrors.lastName.length > 0 ?
              <span className="invalid-input">{ formErrors.lastName }</span> : null
            }
            <input
              value={ this.state.firstName ? this.state.firstName : "" }
              noValidate
              onChange={ this.handleChange }
              type="text"
              name="firstName"
              className={
                `form-control name-input
                ${ formErrors.firstName.length > 0 ? "is-invalid" : "" }`
              }
              placeholder="Имя" />
            {
              formErrors.firstName.length > 0 ?
              <span className="invalid-input">{ formErrors.firstName }</span> : null
            }

            <input
              value={ this.state.middleName ? this.state.middleName : "" }
              noValidate
              onChange={ this.handleChange }
              type="text"
              name="middleName"
              className={
                `form-control name-input
                ${ formErrors.middleName .length> 0 ? "is-invalid" : "" }`
              }
              placeholder="Отчество" />
            {
              formErrors.middleName.length > 0 ?
              <span className="invalid-input">{ formErrors.middleName }</span> : null
            }
          </div>
        </div>

        <div className="form-group">
          <legend>Дата рождения</legend>
          <div className="form-group">
            <input
              value={ this.state.birthDay ? this.state.birthDay : "" }
              noValidate
              onChange={ this.handleChange }
              type="date"
              name="birthDay"
              className="form-control"
              placeholder="Выберите дату" />
          </div>
        </div>

        <div className="form-group">
          <legend>Пол</legend>
          <div className="custom-control custom-checkbox">
            <input
              noValidate
              onChange={ this.handleChange }
              type="radio"
              className="custom-control-input"
              name="sex"
              value="male"
              id="optionMale"
              checked={ this.state.sex && this.state.sex === "male" ? true : false }
              />
            <label className="custom-control-label" htmlFor="optionMale">Мужской</label>
          </div>
          <div className="custom-control custom-checkbox">
            <input
              noValidate
              onChange={ this.handleChange }
              type="radio"
              className="custom-control-input"
              name="sex"
              value="female"
              id="optionFemale"
              checked={ this.state.sex && this.state.sex === "female" ? true : false }
            />
            <label className="custom-control-label" htmlFor="optionFemale">Женский</label>
          </div>
        </div>

        <div className="form-group">
          <legend>Наличие прав</legend>
          <div className="custom-control custom-checkbox">
            <input
              checked={ this.state.hasDriveLicense ? this.state.hasDriveLicense : false }
              noValidate
              onChange={ this.handleChange }
              type="checkbox"
              name="hasDriveLicense"
              className="custom-control-input"
              id="hasLicense"
              />
            <label className="custom-control-label" htmlFor="hasLicense">Есть</label>
          </div>
        </div>

        <div className="form-group">
          <legend >Должность</legend>
          <select
            value={ this.state.position }
            onChange={ this.handleChange }
            name="position"
            className="custom-select"
            id="job-select"
          >
            { positions }
          </select>
        </div>

        <div className="form-group">
          <legend>Дата приема на работу</legend>
          <div className="form-group">
            <input
              value={editing ? this.state.empDate : ""}
              noValidate
              onChange={ this.handleChange }
              name="empDate"
              type="date"
              className="form-control"
              placeholder="Выберите дату" />
          </div>
        </div>
        {
          editing ? dismisDate : null
        }
        </>
      ),
      footer: (
        <>
        {
          // вывод ошибки в случае невалидной формы
          !this.state.formValid ?
          <span className="invalid-input">Форма недозаполнена!</span> : null
        }
        <span>
          <FormButton
            label={ editing ? "Изменить" : "Добавить" }
            type="submit"
            css="btn-primary"
          />
          <FormButton
            label="Отменить"
            type="button"
            css="btn-outline-secondary cancel-btn"
            onClick={ this.handleClose }
          />
        </span>
        </>
      )
    };

    const addForm = (
      <form onSubmit={ this.handleSubmit }>
        <Modal
          children={ children }
          closeModal={ this.handleClose }
          clazz="add-worker-form"
        />
      </form>
    );

    return (
      <>
      {
        showModalAddWorker ? addForm : null
      }
      </>
    );
  }
}
