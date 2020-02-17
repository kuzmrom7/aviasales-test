import constants from "../constants";
import { IStateTabs } from "../../definitions/interfaces";

function reducer(state: IStateTabs, action: any) {
  switch (action.type) {
    case constants.SET_TABS:
      return { data: action.payload };

    default:
      throw new Error();
  }
}

export default reducer;
