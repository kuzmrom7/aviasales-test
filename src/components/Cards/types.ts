import {
  ITicket,
  IStateFilters,
  IStateTickets
} from "../../definitions/interfaces";

export interface IProps {
  filters: IStateFilters;
  tickets: IStateTickets;
}

export interface IPropsComponent {
  data: ITicket[];
}
