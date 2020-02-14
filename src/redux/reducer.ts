import constants from "./constants";
import { IState } from "../defintions/interfaces";

function reducer(state: IState, action: any) {
  switch (action.type) {
    case constants.SET_FILTERS:
      return { ...state, filters: action.payload };

    case constants.SET_TABS:
      return { ...state, tabs: action.payload };

    default:
      throw new Error();
  }
}

export default reducer;
