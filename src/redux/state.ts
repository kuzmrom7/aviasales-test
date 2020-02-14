import { IState } from "../defintions/interfaces";

const initialState: IState = {
  filters: {
    data: [
      { id: 1, text: "Все", isChecked: false },
      { id: 2, text: "Без пересадок", isChecked: false },
      { id: 3, text: "1 пересадка", isChecked: false },
      { id: 4, text: "2 пересадки", isChecked: false },
      { id: 5, text: "3 пересадки", isChecked: false }
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
  }
};

export default initialState;
