import React from "react";
import { IProps } from "./types";

import "./style.scss";

const Tabs: React.FC<IProps> = props => (
  <ul className="tabs">
    {props.tabs.data.map(item => (
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

const TabsContainer = React.memo((props: IProps) => {
  return <Tabs {...props} />;
});

export default TabsContainer;
