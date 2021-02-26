// РАБОТА С localStorage

import SRStorageInit from './local-storage-init';

export default class SRStorage extends SRStorageInit {
  constructor() {
    super();

    // ПРОВЕРКА ИНИЦИАЛИЗАЦИИ ХРАНИЛИЩА
    if (!this.checkInit()) {
      this.init();
    }
  }

  // ГЕНАРАЦИЯ НОВОГО ID
  generateNewId(id) {
    return id + 1;
  }

  // get
  // ПОЛУЧИТЬ ЭЛЕМЕНТ localStorage
  getStorageItem(key) {
    return JSON.parse(localStorage.getItem(key))
  }

  // ПОЛУЧИТЬ ВСЕ ID
  getWorkersIds() {
    return this.getStorageItem("ids");
  }

  // ПОЛУЧИТЬ ВСЕХ СОТРУДНИКОВ
  getWorkersData() {
    return this.getWorkersIds().map((id) => {
      return this.getStorageItem(id);
    });
  }

  // ПОЛУЧИТЬ ВСЕ ДОЛЖНОСТИ
  getPositions() {
    return this.getStorageItem("positions");
  }

  // set
  // ДОБАВИТЬ НОВЫЙ ЭЛЕМЕНТ В localStorage
  setItemToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  // ДОБАВИТЬ НОВЫЙ ID
  setId(id) {
    const new_ids = [ ...this.getWorkersIds(), id ];
    this.setItemToStorage("ids", [...new Set(new_ids)].sort())
  }

  // ДОБАВИТЬ НОВОГО СОТРУДНИКА
  setWorker(worker) {
    this.setId(worker.id);
    this.setItemToStorage(worker.id, worker);
  }

  // del
  // УДАЛИТЬ ID ИЗ СПИСКА ID
  deleteId(id) {
    const new_ids = this.getWorkersIds().filter(item => item != id);
    this.setItemToStorage("ids", new_ids.sort());
  }

  // УДАЛИТЬ ЭЛЕМЕНТ ИЗ localStorage
  deleteStorageItem(id){
    this.deleteId(id);
    localStorage.removeItem(id);
  }
}
