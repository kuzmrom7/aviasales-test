import constants from "../constants";
import { IStateTabs } from "../../definitions/interfaces";
import { setToLocalStorage } from "../../utils";

function reducer(state: IStateTabs, action: any) {
  switch (action.type) {
    case constants.SET_TABS:
      setToLocalStorage("tabs", action.payload);
      return { data: action.payload };

    default:
      throw new Error();
  }
}

export default reducer;
