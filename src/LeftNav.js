import React, { useState } from "react";
import { MenuList } from "./Data";

export default function LeftNav() {
  const [isSelected, setIsSelected] = useState(0);
  const handleClick = (name) => {
    console.log(name);
    setIsSelected(name);
  };

  return (
    <div className="left-nav">
      <h2>Kanon Dashboard</h2>
      <ul>
        {MenuList.map((ele, i) => (
          <li
            key={i}
            className={isSelected === i ? "active" : ""}
            onClick={() => handleClick(i)}
          >
            {ele.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
