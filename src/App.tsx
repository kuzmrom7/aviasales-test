import React, { useReducer, Reducer, useEffect } from "react";
import Filters from "./components/Filters";
import Tabs from "./components/Tabs";
import Cards from "./components/Cards";
import { actions } from "./redux";
import {
  IStateTickets,
  IStateTabs,
  IStateFilters
} from "./definitions/interfaces";
import { ActionTickets, ActionTabs, ActionFilters } from "./definitions/types";
import { ticketsReducer, tabsReducer, filtersReducer } from "./redux/reducers";
import { initTabs, initFilters, initTickets } from "./redux/state";

import logo from "./logo.svg";
import "./app.scss";

const App = () => {
  const [tickets, dispatchTickets] = useReducer<
    Reducer<IStateTickets, ActionTickets>
  >(ticketsReducer, initTickets);
  const [tabs, dispatchTabs] = useReducer<Reducer<IStateTabs, ActionTabs>>(
    tabsReducer,
    initTabs
  );
  const [filters, dispatchFilters] = useReducer<
    Reducer<IStateFilters, ActionFilters>
  >(filtersReducer, initFilters);

  useEffect(() => {
    actions.fetchTickets(dispatchTickets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const activeIndex = tabs.data.findIndex(e => e.isActive === true);

    actions.sortTickets(
      dispatchTickets,
      tickets.data || [],
      tabs.data[activeIndex].id
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs]);

  const handleClickFilter = (item: any) => {
    actions.setFilters(dispatchFilters, filters, item);
  };

  const handleClickTab = (item: any) => {
    actions.setTabs(dispatchTabs, tabs, item);
  };

  return (
    <div className="wrap">
      <div className="header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>

      <div className="container">
        <Filters handleClick={handleClickFilter} filters={filters} />
        <div className="results">
          <div className="sort">
            <Tabs handleClick={handleClickTab} tabs={tabs} />
            <Cards tickets={tickets} filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
