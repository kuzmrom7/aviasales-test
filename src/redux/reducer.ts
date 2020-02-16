import constants from "./constants";
import { IState } from "../definitions/interfaces";

function reducer(state: IState, action: any) {
  switch (action.type) {
    case constants.SET_FILTERS:
      return { ...state, filters: action.payload };

    case constants.SET_TABS:
      return { ...state, tabs: action.payload };

    case constants.SET_TICKETS:
      return {
        ...state,
        tickets: { isLoaded: true, data: action.payload, filteredData: [] }
      };

    case constants.SET_TICKETS_ERROR:
      return {
        ...state,
        tickets: {
          isError: true,
          isLoaded: false,
          data: []
        }
      };

    default:
      throw new Error();
  }
}

export default reducer;
