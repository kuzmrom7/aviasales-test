import add from "date-fns/add";
import format from "date-fns/format";
import { ITicket } from "../definitions/interfaces";

function getBoardingTime(seconds: number) {
  const hours = (seconds / 3600) ^ 0;
  const minutes = ((seconds - hours * 3600) / 60) ^ 0;

  const str = `${
    hours === 0 ? "" : hours < 10 ? "0" + hours + "ч" : hours + "ч"
  } ${
    minutes === 0 ? "" : minutes < 10 ? "0" + minutes + " м" : minutes + " м"
  }`;

  return str;
}

function getTimeOnFly(date: string, second: number) {
  var result = add(new Date(date), {
    seconds: second
  });

  return `${format(new Date(date), "HH:mm")} : ${format(
    new Date(result),
    "HH:mm"
  )}`;
}

function declOfNum(number: number) {
  switch (number) {
    case 0:
      return "Прямой";
    case 1:
      return "1 пересадка";
    case 2:
      return "2 пересадки";
    case 3:
      return "3 пересадки";
    case 4:
      return "4 пересадки";

    default:
      return number;
  }
}

function sortByPrice(a: ITicket, b: ITicket) {
  const priceA = a.price;
  const priceB = b.price;

  if (priceA > priceB) {
    return 1;
  }
  return -1;
}

function sortByTime(a: ITicket, b: ITicket) {
  let timeA = 0;
  let timeB = 0;

  a.segments.forEach(e => {
    timeA = timeA + e.duration;
  });

  b.segments.forEach(e => {
    timeB = timeB + e.duration;
  });

  if (timeA > timeB) {
    return 1;
  }
  return -1;
}

function getPrettyPrice(price: number) {
  return `${price.toLocaleString("ru-RU", {
    style: "decimal",
    currency: "RUB"
  })} Р`;
}
export {
  getBoardingTime,
  getTimeOnFly,
  declOfNum,
  sortByPrice,
  sortByTime,
  getPrettyPrice
};
