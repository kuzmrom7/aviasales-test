import React from "react";
import "./style.scss";
import { ITabs } from "../../defintions/interfaces";

interface IProps {
  tabs: ITabs[];
  handleClick: any;
}

const Tabs: React.FC<IProps> = props => (
  <ul className="tabs">
    {props.tabs.map(item => (
      <li
        key={item.id}
        className={`tab ${item.isActive ? "tab__is-active" : ""}`}
        onClick={() => props.handleClick(item)}
      >
        {item.text}
      </li>
    ))}
  </ul>
);

export default Tabs;