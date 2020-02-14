import React from "react";
import { IFilter } from "../../defintions/interfaces";

import "./style.scss";
import "./checkbox.scss";

interface IProps {
  filters: IFilter[];
  handleClick: any;
}

const Filters: React.FC<IProps> = props => (
  <div className="filters">
    <div className="filter-item">
      <div className="filter-item__title">Количество пересадок</div>
      <div className="filter-item__list">
        {props.filters.map(item => (
          <div
            key={item.id}
            className="filter-item__element"
            onClick={() => props.handleClick(item)}
          >
            <div className="filter-item__value">
              <label className="checkbox-container">
                {item.text}
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => props.handleClick(item)}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Filters;
