import constants from "./constants";
import { IFilter, ITicket, IStateFilters } from "../definitions/interfaces";
import { sortByPrice, sortByTime } from "../utils";
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
      actions.sortTickets(dispatch, tickets, 1);
    } catch (error) {
      dispatch({
        type: constants.SET_TICKETS_ERROR
      });
    }
  },
  sortTickets: (dispatch: any, tickets: ITicket[], activeTabId: number) => {
    if (activeTabId === 1) {
      const sorted = tickets.sort(sortByTime);

      dispatch({
        type: constants.SET_TICKETS,
        payload: sorted
      });
    }

    if (activeTabId === 2) {
      const sorted = tickets.sort(sortByPrice);

      dispatch({
        type: constants.SET_TICKETS,
        payload: sorted
      });
    }
  }
};

export default actions;
