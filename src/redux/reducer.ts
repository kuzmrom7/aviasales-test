import constants from "./constants";
import { IState } from "../definitions/interfaces";

function reducer(state: IState, action: any) {
  switch (action.type) {
    case constants.SET_FILTERS:
      return { ...state, filters: action.payload };

    case constants.SET_TABS:
      return { ...state, tabs: action.payload };

    case constants.SET_TICKETS:
      return { ...state, tickets: action.payload };

    default:
      throw new Error();
  }
}

export default reducer;
