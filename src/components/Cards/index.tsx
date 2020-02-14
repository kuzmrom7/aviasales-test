import React, { ReactElement } from "react";

import "./style.scss";

const mock = [
  {
    price: 88646,
    carrier: "MH",
    segments: [
      {
        origin: "MOW",
        destination: "HKT",
        date: "2020-02-22T22:31:00.000Z",
        stops: ["IST"],
        duration: 1336
      },
      {
        origin: "MOW",
        destination: "HKT",
        date: "2020-03-14T16:03:00.000Z",
        stops: ["HKG", "SIN"],
        duration: 1837
      }
    ]
  },
  {
    price: 53696,
    carrier: "SU",
    segments: [
      {
        origin: "MOW",
        destination: "HKT",
        date: "2020-02-23T14:12:00.000Z",
        stops: ["BKK", "IST"],
        duration: 928
      },
      {
        origin: "MOW",
        destination: "HKT",
        date: "2020-03-13T21:35:00.000Z",
        stops: [],
        duration: 1043
      }
    ]
  }
];

const Cards = (): ReactElement => {
  return (
    <div className="cards">
      {mock.map((item, index) => (
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
          <div className="card__bottom">bottom</div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
