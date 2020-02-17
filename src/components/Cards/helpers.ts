import { IFilter, ITicket } from "../../definitions/interfaces";

import "./style.scss";

function getFilteredTickets(appliedFilters: IFilter[], tickets: ITicket[]) {
  const activeValues = appliedFilters.map(e => e.value);

  if (activeValues.length > 0) {
    const filteredTickets = tickets.filter((e: ITicket) => {
      const stops = e.segments
        .map(e => e.stops)
        .sort((a, b) => {
          if (a.length < b.length) {
            return 1;
          }
          return -1;
        });

      const count = stops[0].length;

      if (activeValues.includes(count)) {
        return true;
      }
      return false;
    });
    return filteredTickets;
  }
  return tickets;
}

export { getFilteredTickets };
