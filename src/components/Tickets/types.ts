import {
  ITicket,
  IStateFilters,
  IStateTickets,
  IStateTabs
} from "../../definitions/interfaces";

export interface IProps {
  filters: IStateFilters;
  tickets: IStateTickets;
  tabs: IStateTabs;
}

export interface IPropsComponent {
  data: ITicket[];
}
