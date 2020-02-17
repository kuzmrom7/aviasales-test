import React, { ReactElement } from "react";
import Loader from "./Loader";
import {
  getBoardingTime,
  getTimeOnFly,
  declOfNum,
  getPrettyPrice
} from "../../utils";
import { IProps, IPropsComponent } from "./types";
import { getFilteredTickets, getSortedTickets } from "./helpers";

import "./style.scss";

const Tickets: React.FC<IPropsComponent> = ({ data }): ReactElement => {
  return (
    <div className="Tickets">
      {data.map((item, index) => (
        <div className="ticket" key={index}>
          <div className="ticket__top">
            <div className="ticket__price">{getPrettyPrice(item.price)}</div>
            <div className="ticket__logo">
              <img
                className="ticket-carrier__img"
                src={`//pics.avs.io/99/36/${item.carrier}.png`}
                width="99"
                height="36"
                alt="IrAero"
              ></img>
            </div>
          </div>
          <div className="ticket__bottom">
            {item.segments.map((item, index) => (
              <div className="ticket-info" key={index}>
                <div className="ticket-endpoint">
                  <div className="ticket-endpoint__title">
                    {item.origin} - {item.destination}
                  </div>
                  <div> {getTimeOnFly(item.date, item.duration)}</div>
                </div>
                <div className="ticket-endpoint">
                  <div className="ticket-endpoint__title">В пути</div>
                  <div>{getBoardingTime(item.duration)}</div>
                </div>
                <div className="ticket-endpoint">
                  <div className="ticket-endpoint__title">
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

const TicketsContainer = React.memo((props: IProps) => {
  const { data, isLoaded, isError } = props.tickets;

  const filters = props.filters.data;
  const tabs = props.tabs.data;

  const appliedFilters = filters.filter(e => e.isChecked);
  const filteredTickets = getFilteredTickets(appliedFilters, data || []);

  const activeIndex = tabs.findIndex(e => e.isActive === true);
  const sortedTickets = getSortedTickets(tabs[activeIndex].id, filteredTickets);

  if (isError)
    return <div className="ticket-error"> Error , please reload page</div>;

  if (!isLoaded) {
    return <Loader />;
  }

  return <Tickets data={sortedTickets} />;
});

export default TicketsContainer;
