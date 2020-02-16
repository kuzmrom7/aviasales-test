import axios from "axios";
import constants from "./constants";
import { IFilter, IState } from "../definitions/interfaces";

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
  },
  fetchTickets: async (dispatch: any, data: IState) => {
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
        dispatch({
          type: constants.SET_TICKETS,
          payload: { data: [tickets], isLoaded: false }
        });
      }
    }

    const tickets = await fetchData();

    dispatch({
      type: constants.SET_TICKETS,
      payload: { data: tickets, isLoaded: true }
    });
  }
};

export default actions;
