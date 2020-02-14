import constants from "./constants";
import { IFilter, IState } from "../defintions/interfaces";

const actions = {
  fetchData: (dispatch: any) => {
    return dispatch({ type: constants.FETCH_DATA, payload: 1 });
  },
  setFilters: (dispatch: any, data: IState, item: any) => {
    const f = data.filters.data;

    if (item.id === 1 || item.text === "Все") {
      let value = !item.isChecked;
      let updatedFilters = f.map(e => {
        e.isChecked = value;
        return e;
      });
      return dispatch({
        type: constants.SET_FILTERS,
        payload: { data: updatedFilters }
      });
    }

    const updatedFilters: IFilter[] = f.map(e => {
      if (item.id === e.id) {
        e.isChecked = !e.isChecked;
      }
      return e;
    });

    dispatch({
      type: constants.SET_FILTERS,
      payload: { data: updatedFilters }
    });
  },
  setTabs: (dispatch: any, data: IState, item: any) => {
    const updatedTabs = data.tabs.data.map(e => {
      if (item.id === e.id) {
        e.isActive = true;
        return e;
      }
      e.isActive = false;
      return e;
    });

    dispatch({ type: constants.SET_TABS, payload: { data: updatedTabs } });
  }
};

export default actions;
