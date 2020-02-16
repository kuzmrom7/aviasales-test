import React, { ReactElement } from "react";
import { getBoardingTime, getTimeOnFly, declOfNum } from "../../utils";
import { IFilter, ITicket, ITickets } from "../../definitions/interfaces";

import "./style.scss";

interface IProps {
  filters: {
    data: IFilter[];
  };
  tickets: ITickets;
}

interface IProps_ {
  data: ITicket[];
}
const Cards: React.FC<IProps_> = ({ data }): ReactElement => {
  return (
    <div className="cards">
      {data.map((item, index) => (
        <div className="card" key={index}>
          <div className="card__top">
            <div className="card__price">{item.price} Р</div>

            <img
              className="ticket-carrier__img"
              src={`//pics.avs.io/99/36/${item.carrier}.png`}
              width="99"
              height="36"
              alt="IrAero"
            ></img>
          </div>
          <div className="card__bottom">
            {item.segments.map((item, index) => (
              <div className="card-info" key={index}>
                <div className="card-endpoint">
                  <div className="card-endpoint__title">
                    {item.origin} - {item.destination}
                  </div>
                  <div> {getTimeOnFly(item.date, item.duration)}</div>
                </div>
                <div className="card-endpoint">
                  <div className="card-endpoint__title">В пути</div>
                  <div>{getBoardingTime(item.duration)}</div>
                </div>
                <div className="card-endpoint">
                  <div className="card-endpoint__title">
                    {declOfNum(item.stops.length)}
                  </div>
                  <div> {item.stops.join(", ")}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

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

const CardsContainer: React.FC<IProps> = props => {
  const { data, isLoaded, isError } = props.tickets;
  const filters = props.filters.data;

  const appliedFilters = filters.filter(e => e.isChecked);
  const filteredTickets = getFilteredTickets(appliedFilters, data);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const child = React.useMemo(() => <Cards data={filteredTickets} />, [
    props.tickets,
    props.filters
  ]);

  if (isError) return <div> Error ,reload</div>;
  if (!isLoaded) return <div>....fetch </div>;
  return <>{child}</>;
};

export default CardsContainer;
