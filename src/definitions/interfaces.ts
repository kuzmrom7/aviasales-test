export interface IFilter {
  id: number;
  text: string;
  isChecked: boolean;
  value: number;
}

export interface ITabs {
  id: number;
  text: string;
  isActive: boolean;
}

export interface ITicket {
  // Цена в рублях
  price: number;
  // Код авиакомпании (iata)
  carrier: string;
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: [
    {
      // Код города (iata)
      origin: string;
      // Код города (iata)
      destination: string;
      // Дата и время вылета туда
      date: string;
      // Массив кодов (iata) городов с пересадками
      stops: string[];
      // Общее время перелёта в минутах
      duration: number;
    },
    {
      // Код города (iata)
      origin: string;
      // Код города (iata)
      destination: string;
      // Дата и время вылета обратно
      date: string;
      // Массив кодов (iata) городов с пересадками
      stops: string[];
      // Общее время перелёта в минутах
      duration: number;
    }
  ];
}

export interface ITickets {
  isLoaded: boolean;
  isError?: boolean;
  data: ITicket[];
}

export interface IState {
  filters: {
    data: IFilter[];
  };
  tabs: {
    data: ITabs[];
  };
  tickets: ITickets;
}

export interface IStateTickets {
  isLoaded: boolean;
  isError?: boolean;
  data?: ITicket[];
}

export interface IStateTabs {
  data: ITabs[];
}

export interface IStateFilters {
  data: IFilter[];
}
