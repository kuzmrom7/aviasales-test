import React, { ReactElement } from "react";

import "./style.scss";
import { getBoardingTime, getTimeOnFly, declOfNum } from "../../utils";
import { ITickets } from "../../definitions/interfaces";

// const mock = [
//   {
//     price: 88646,
//     carrier: "MH",
//     segments: [
//       {
//         origin: "MOW",
//         destination: "HKT",
//         date: "2020-02-22T22:31:00.000Z",
//         stops: ["IST"],
//         duration: 1336
//       },
//       {
//         origin: "MOW",
//         destination: "HKT",
//         date: "2020-03-14T16:03:00.000Z",
//         stops: ["HKG", "SIN"],
//         duration: 1837
//       }
//     ]
//   },
//   {
//     price: 53696,
//     carrier: "SU",
//     segments: [
//       {
//         origin: "MOW",
//         destination: "HKT",
//         date: "2020-02-23T14:12:00.000Z",
//         stops: ["BKK", "IST"],
//         duration: 928
//       },
//       {
//         origin: "MOW",
//         destination: "HKT",
//         date: "2020-03-13T21:35:00.000Z",
//         stops: [],
//         duration: 1043
//       }
//     ]
//   }
// ];

interface IProps {
  tickets: ITickets;
}
const Cards: React.FC<IProps> = ({
  tickets: { isLoaded, data }
}): ReactElement => {
  if (!isLoaded) return <div>....fecth </div>;
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
