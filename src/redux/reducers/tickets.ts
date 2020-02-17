import constants from "../constants";
import { IStateTickets } from "../../definitions/interfaces";

function reducer(state: IStateTickets, action: any) {
  switch (action.type) {
    case constants.SET_TICKETS:
      return {
        ...state,
        isLoaded: true,
        data: action.payload
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
