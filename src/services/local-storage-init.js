// ИНИЦИАЛИЗАЦИЯ ХРАНИЛИЩА

// ДОЛЖНОСТИ
 const positions = [
  "Junior Frontend",
  "Middle Frontend",
  "Senior Frontend",
  "Junior Backend",
  "Middle Backend",
  "Senior Backend",
  "Fullstack",
  "HR-Manager"
];

// ИЗНАЧАЛЬНЫЙ СПИСОК СОТРУДНИКОВ ДЛЯ ИНИЦИАЛИЗАЦИИ ХРАНИЛИЩА
const workersList = [
  {
    id: 100,
    lastName: "Иванов",
    firstName: "Иван",
    middleName: "Иваныч",
    birthDay: "1982-04-11",
    sex: "male",
    hasDriveLicense: false,

    position: "Senior Frontend",
    empDate: "2006-12-02",
    dismisDate: ""
  },
  {
    id: 101,
    lastName: "Петров",
    firstName: "Петр",
    middleName: "Петрович",
    birthDay: "1976-04-17",
    sex: "male",
    hasDriveLicense: true,

    position: "Senior Backend",
    empDate: "2004-06-19",
    dismisDate: "2012-06-10"

  },
  {
    id: 102,
    lastName: "Трухин",
    firstName: "Егор",
    middleName: "Юрьевич",
    birthDay: "2000-06-20",
    sex: "male",
    hasDriveLicense: false,

    position: "Junior Frontend",
    empDate: "2020-08-10",
    dismisDate: ""

  }
];

// СПИСОК ID
const ids = workersList.map(worker => {
  return worker.id;
});

// СПИСОК КЛЮЧЕЙ ДЛЯ ЗАПОЛНЕНИЯ localStorage
const keys = ["ids", ...ids, "positions"];

// ПОЛУЧИТЬ ЭЛЕМЕНТ
const getStorageItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

// ДОБАВИТЬ НОВЫЙ ЭЛЕМЕНТ
const pushItemToStorage = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
}

// ИНИЦИАЛИЗАЦИЯ
export default class SRStorageInit {
  checkInit() {
    const checker = getStorageItem("ids");
    if (checker != null) {
      return checker.every((id) => {
        return (getStorageItem(id) != null);
      });
    }
    else {
      return keys.every((key) => {
        return (getStorageItem(key) != null);
      });
    }
  }

  init() {
    keys.forEach((key) => {
      if (!localStorage.getItem(key)) {
        switch (key) {
          case "ids":
            pushItemToStorage(key, ids);
            break;
          case "positions":
            pushItemToStorage(key, positions);
            break;
          default:
            pushItemToStorage(key,
              workersList.find(item => item.id === key));
        }
      }
    });
  }
}
