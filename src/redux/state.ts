import { IState } from "../definitions/interfaces";

const initialState: IState = {
  filters: {
    data: [
      { id: 1, text: "Все", isChecked: false, value: -1 },
      { id: 2, text: "Без пересадок", isChecked: false, value: 0 },
      { id: 3, text: "1 пересадка", isChecked: false, value: 1 },
      { id: 4, text: "2 пересадки", isChecked: false, value: 2 },
      { id: 5, text: "3 пересадки", isChecked: false, value: 3 }
    ]
  },
  tabs: {
    data: [
      {
        id: 1,
        text: "Самый быстрый",
        isActive: true
      },
      {
        id: 2,
        text: "Самый дешевый",
        isActive: false
      }
    ]
  },
  tickets: {
    isLoaded: false,
    isError: false,
    data: []
  }
};

export default initialState;
