import React from 'react';
import './worker-info.css';

import Modal from '../modal';
import FormButton from '../form-button';
import EditDelButtons from '../edit-n-del-buttons';

import SRStorage from '../../services/local-storage-service';

const WorkerInfo = ( { showModalWorkerInfo, closeModal, currID } ) => {
  const _storage = new SRStorage();
  let content = null;

  if (showModalWorkerInfo) {
    const { mainInfo, job } = _storage.getStorageItem(currID);;
    const name = `${mainInfo.name.first} ${mainInfo.name.last} ${mainInfo.name.middle}`

    content = (
      <p>
        ФИО: { name }
        Пол: { mainInfo.sex === 'male' ? "Мужской" : "Женский" }
        Дата рождения: { mainInfo.birthDay }
        Водительские права: { mainInfo.hasDriveLicense ? "Есть" : "Нет" }
        Должность: { job.position }
        Дата приема: { job.empDate }
        Дата увольнения: { job.dismisDate ? job.dismisDate : "-" }
      </p>
    );
  }

  const children = {
    title: "Информация о сотруднике",
    body: content,
    footer: (
      <>
        <EditDelButtons />
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
