export interface IFilter {
  id: number;
  text: string;
  isChecked: boolean;
}

export interface ITabs {
  id: number;
  text: string;
  isActive: boolean;
}

export interface IState {
  filters: {
    data: IFilter[];
  };
  tabs: {
    data: ITabs[];
  };
}
