import constants from "./constants";
import { IFilter, IStateFilters } from "../definitions/interfaces";
import { fetchData } from "./api";
import { IStateTabs } from "../definitions/interfaces";

const actions = {
  setFilters: (dispatch: any, state: IStateFilters, item: any) => {
    const f = state.data;
    let updatedFilters: IFilter[];

    if (item.id === 1) {
      let value = !item.isChecked;
      updatedFilters = f.map(e => {
        e.isChecked = value;
        return e;
      });
    } else {
      updatedFilters = f.map(e => {
        if (e.id === 1) {
          e.isChecked = false;
        }
        if (item.id === e.id) {
          e.isChecked = !e.isChecked;
        }
        return e;
      });
    }
    dispatch({
      type: constants.SET_FILTERS,
      payload: updatedFilters
    });
  },
  setTabs: (dispatch: any, state: IStateTabs, item: any) => {
    const t = state.data;
    const updatedTabs = t.map(e => {
      if (item.id === e.id) {
        e.isActive = true;
        return e;
      }
      e.isActive = false;
      return e;
    });
    dispatch({ type: constants.SET_TABS, payload: updatedTabs });
  },
  fetchTickets: async (dispatch: any) => {
    try {
      const tickets = await fetchData();

      await dispatch({
        type: constants.SET_TICKETS,
        payload: tickets
      });
    } catch (error) {
      await dispatch({
        type: constants.SET_TICKETS_ERROR
      });
    }
  }
};

export default actions;
