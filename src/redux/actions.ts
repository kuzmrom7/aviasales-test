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

    const appliedFilters = updatedFilters.filter(e => e.isChecked);
    actions.filterTickets(dispatch, data, appliedFilters);
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
    try {
      const tickets = await fetchData();
      actions.sortTickets(dispatch, data, tickets, 1);
    } catch (error) {
      dispatch({
        type: constants.SET_TICKETS_ERROR
      });
    }
  },
  sortTickets: (
    dispatch: any,
    data: IState,
    tickets: ITicket[],
    activeTabId: number
  ) => {
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
  },
  filterTickets: async (
    dispatch: any,
    state: IState,
    appliedFilters: IFilter[]
  ) => {
    try {
      const activeValues = appliedFilters.map(e => e.value);

      const tickets = await fetchData();
      let filteredTickets = tickets;

      if (activeValues.length > 0) {
        filteredTickets = await tickets.filter((e: ITicket) => {
          const stops = e.segments
            .map(e => e.stops)
            .sort((a, b) => {
              if (a.length < b.length) {
                return 1;
              }
              return -1;
            });

          const count = stops[0].length;

          if (activeValues.includes(count)) {
            return true;
          }
          return false;
        });
      }

      const activeIndex = state.tabs.data.findIndex(e => e.isActive === true);

      actions.sortTickets(
        dispatch,
        state,
        filteredTickets,
        state.tabs.data[activeIndex].id
      );
    } catch (error) {
      dispatch({
        type: constants.SET_TICKETS_ERROR
      });
    }
  }
};

export default actions;
