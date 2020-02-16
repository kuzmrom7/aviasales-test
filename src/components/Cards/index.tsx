import React, { ReactElement } from "react";
import { getBoardingTime, getTimeOnFly, declOfNum } from "../../utils";
import { ITickets } from "../../definitions/interfaces";

import "./style.scss";

interface IProps {
  tickets: ITickets;
}
const Cards: React.FC<IProps> = ({
  tickets: { isLoaded, isError, data }
}): ReactElement => {
  if (isError) return <div> Error ,reload</div>;
  if (!isLoaded) return <div>....fetch </div>;
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

const CardsContainer: React.FC<IProps> = props => {
  const tickets = props.tickets;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const child = React.useMemo(() => <Cards {...props} />, [tickets]);

  return <> {child} </>;
};

export default CardsContainer;
