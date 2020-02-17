import constants from "../constants";
import { IStateFilters } from "../../definitions/interfaces";
import { setToLocalStorage } from "../../utils";

function reducer(state: IStateFilters, action: any) {
  switch (action.type) {
    case constants.SET_FILTERS:
      setToLocalStorage("filters", action.payload);
      return { ...state, data: action.payload };

    default:
      throw new Error();
  }
}

export default reducer;
