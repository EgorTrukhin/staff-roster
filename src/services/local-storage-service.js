import SRStorageInit from './local-storage-init';

export default class SRStorage extends SRStorageInit {
  constructor() {
    super();
    
    if (!this.checkInit()) {
      this.init();
    }
  }

  // get
  getStorageItem(key) {
    return JSON.parse(localStorage.getItem(key))
  }

  getWorkersIds() {
    return this.getStorageItem("ids");
  }

  getWorkersData() {
    return this.getWorkersIds().map((id) => {
      return this.getStorageItem(id);
    });
  }

  getPositions() {
    return this.getStorageItem("positions");
  }

  // set
  setItemToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  setId(id) {
    const new_ids = [ ...this.getWorkersIds(), id ];
    this.setItemToStorage("ids", new_ids.sort())
  }

  setWorker(worker) {
    this.setId(worker.id);
    this.setItemToStorage(worker.id, worker);
  }

  // del
  deleteId(id) {
    const new_ids = this.getWorkersIds().filter(item => item != id);
    this.setItemToStorage("ids", new_ids.sort());
  }

  deleteStorageItem(id){
    this.deleteId(id);
    localStorage.removeItem(id);
  }
}
