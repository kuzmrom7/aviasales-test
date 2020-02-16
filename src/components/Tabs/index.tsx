import React from "react";
import { ITabs } from "../../definitions/interfaces";

import "./style.scss";
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

const TabsContainer: React.FC<IProps> = props => {
  const tabs = props.tabs;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const child = React.useMemo(() => <Tabs {...props} />, [tabs]);

  return <> {child} </>;
};

export default TabsContainer;
