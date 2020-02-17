import axios from "axios";

async function fetchData() {
  try {
    const response = await axios.get(
      "https://front-test.beta.aviasales.ru/search"
    );
    const searchId = await response.data.searchId;

    const responseTickets = await axios.get(
      `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`
    );
    return responseTickets.data.tickets.slice(0, 20);
  } catch (e) {
    throw new Error("");
  }
}

export { fetchData };
