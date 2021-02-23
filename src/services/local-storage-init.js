export default class SRStorageInit {
  positions = [
    "Junior Frontend",
    "Middle Frontend",
    "Senior Frontend",
    "Junior Backend",
    "Middle Backend",
    "Senior Backend",
    "Fullstack",
    "HR-Manager"
  ];

  workersList = [
    {
      id: "000",
      mainInfo: {
        name: {
          first: "Иванов",
          last: "Иван",
          middle: "Иваныч"
        },
        birthDay: "04.11.1982",
        sex: "male",
        hasDriveLicense: false
      },
      job:{
        position: "Frontend",
        empDate: "12.02.2006",
        dismisDate: NaN
      }
    },
    {
      id: "001",
      mainInfo: {
        name: {
          first: "Петров",
          last: "Петр",
          middle: "Петрович"
        },
        birthDay: "17.04.1976",
        sex: "male",
        hasDriveLicense: true
      },
      job:{
        position: "Backend",
        empDate: "19.06.2004",
        dismisDate: "06.10.2012"
      }
    },
    {
      id: "002",
      mainInfo: {
        name: {
          first: "Трухин",
          last: "Егор",
          middle: "Юрьевич"
        },
        birthDay: "20.06.2000",
        sex: "male",
        hasDriveLicense: false
      },
      job:{
        position: "Junior Frontend",
        empDate: "08.10.2020",
        dismisDate: NaN
      }
    }
  ];

  ids = this.workersList.map(worker => {
    return worker.id;
  });

  keys = ["ids", ...this.ids, "positions"];

  pushItemToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  getWorkerWithoutId(id) {
    const { mainInfo, job } = this.workersList.find(item => item.id === id);
    return { mainInfo, job };
  }

  checkInit() {
    return this.keys.every((key) => {
      return localStorage.getItem(key) != null;
    });
  }

  init() {
    this.keys.forEach((key) => {
      if (!localStorage.getItem(key)) {
        switch (key) {
          case "ids":
            this.pushItemToStorage(key, this.ids);
            break;
          case "positions":
            this.pushItemToStorage(key, this.positions);
            break;
          default:
            this.pushItemToStorage(key,
              this.workersList.find(item => item.id === key));
        }
      }
    });
  }
}
