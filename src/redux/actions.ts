import axios from "axios";
import constants from "./constants";
import { IFilter, IState, ITicket } from "../definitions/interfaces";
import { sortByPrice, sortByTime } from "../utils";

async function fetchData() {
  try {
    const response = await axios.get(
      "https://front-test.beta.aviasales.ru/search"
    );
    const searchId = await response.data.searchId;

    const responseTickets = await axios.get(
      `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`
    );
    return responseTickets.data.tickets.slice(0, 20);
  } catch (e) {
    throw new Error("");
  }
}

const actions = {
  setFilters: (dispatch: any, data: IState, item: any) => {
    const f = data.filters.data;
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
      payload: { data: updatedFilters }
    });
  },
  setTabs: (dispatch: any, state: IState, item: any) => {
    const updatedTabs = state.tabs.data.map(e => {
      if (item.id === e.id) {
        e.isActive = true;
        return e;
      }
      e.isActive = false;
      return e;
    });

    dispatch({ type: constants.SET_TABS, payload: { data: updatedTabs } });
  },
  fetchTickets: async (dispatch: any, data: IState) => {
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
