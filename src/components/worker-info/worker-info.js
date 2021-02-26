import React from 'react';
import './worker-info.css';

import Modal from '../modal';
import FormButton from '../form-button';
import EditDelButtons from '../edit-n-del-buttons';

import SRStorage from '../../services/local-storage-service';

// МОДАЛЬНОЕ ОКНО ДЛЯ ОТОБРАЖЕНИЯ ИНФОРМАЦИИ О СОТРУДНИКЕ
// По полученному id достается сотрудник из хранилища
const WorkerInfo = ( { showModalWorkerInfo, closeModal, currID, onEdit, onDelete } ) => {
  const _storage = new SRStorage();
  let content = null;

  if (showModalWorkerInfo) {
    const worker = _storage.getStorageItem(currID);;
    const name = `${worker.firstName} ${worker.lastName} ${worker.middleName}`

    content = (
      <div className="worker-info-content">
        <div className="worker-info-content-item personal-info">
        <h6>Личная информация</h6>
          <span>
            { `ФИО:
            ${ name }`}
          </span>
          <span>
            { `Пол:
            ${ worker.sex === 'male' ? "мужской" : "женский" }`}
          </span>
          <span>
            { `Дата рождения:
            ${ worker.birthDay }`}
          </span>
          <span>
            { `Водительские права:
            ${ worker.hasDriveLicense ? "есть" : "нет" }`}
          </span>

        </div>
        <div className="worker-info-content-item job-info">
          <h6>Статус в компании</h6>
          <span>
            { `Должность:
            ${ worker.position } `}
          </span>
          <span>
            { `Дата приема:
            ${ worker.empDate } `}
          </span>
          {
            worker.dismisDate ?
              <span>
                { `Дата увольнения:
                ${ worker.dismisDate } `}
              </span> : null
          }
        </div>
      </div>
    );
  }

  const children = {
    title: "Информация о сотруднике",
    body: content,
    footer: (
      <>
        <EditDelButtons
          onEdit={ () => { closeModal(); onEdit(currID) } }
          onDelete={ () => { closeModal(); onDelete(currID) } }
        />
        <div>
          <FormButton
            label="Закрыть"
            type="button"
            css="btn-secondary btn-sm"
            onClick={ closeModal }
          />
        </div>
      </>
    )
  }
  return (
    <>
    {
      showModalWorkerInfo ? <Modal children={ children } closeModal={ closeModal } clazz="worker-info" /> : null
    }
    </>
  );
};

export default WorkerInfo;
