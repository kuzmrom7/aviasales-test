import React from "react";
import { IStateFilters } from "../../definitions/interfaces";

import "./style.scss";
import "./checkbox.scss";

interface IProps {
  filters: IStateFilters;
  handleClick: any;
}

const Filters: React.FC<IProps> = props => (
  <div className="filters">
    <div className="filter-item">
      <div className="filter-item__title">Количество пересадок</div>
      <div className="filter-item__list">
        {props.filters.data.map(item => (
          <div
            key={item.id}
            className="filter-item__element"
            onClick={e => props.handleClick(e, item)}
          >
            <div className="filter-item__value">
              <label className="checkbox-container">
                {item.text}
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={e => props.handleClick(e, item)}
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

const FilterContainer = React.memo((props: IProps) => {
  const handleChange = (e: any, item: any) => {
    e.stopPropagation();
    props.handleClick(item);
  };
  return <Filters {...props} handleClick={handleChange} />;
});

export default FilterContainer;
