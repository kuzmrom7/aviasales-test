import constants from "../constants";
import { IStateFilters } from "../../definitions/interfaces";

function reducer(state: IStateFilters, action: any) {
  switch (action.type) {
    case constants.SET_FILTERS:
      return { ...state, data: action.payload };

    default:
      throw new Error();
  }
}

export default reducer;
