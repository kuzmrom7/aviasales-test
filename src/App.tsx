import React, { useReducer, Reducer, useEffect } from "react";
import Filters from "./components/Filters";
import Tabs from "./components/Tabs";
import Cards from "./components/Cards";
import { reducer, actions, initialState } from "./redux";
import { IState } from "./definitions/interfaces";
import { Action } from "./definitions/types";

import logo from "./logo.svg";
import "./app.scss";

const App = () => {
  const [state, dispatch] = useReducer<Reducer<IState, Action>>(
    reducer,
    initialState
  );

  useEffect(() => {
    actions.fetchTickets(dispatch, state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const activeIndex = state.tabs.data.findIndex(e => e.isActive === true);

    actions.sortTickets(
      dispatch,
      state.tickets.data,
      state.tabs.data[activeIndex].id
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.tabs.data]);

  const handleClickFilter = (item: any) => {
    actions.setFilters(dispatch, state, item);
  };

  const handleClickTab = (item: any) => {
    actions.setTabs(dispatch, state, item);
  };

  return (
    <div className="wrap">
      <div className="header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>

      <div className="container">
        <Filters handleClick={handleClickFilter} filters={state.filters.data} />
        <div className="results">
          <div className="sort">
            <Tabs handleClick={handleClickTab} tabs={state.tabs.data} />
            <Cards tickets={state.tickets} filters={state.filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
