import React from "react";

import LeftNav from "./LeftNav";
import Search from "./Search";
import Items from "./Items";
import { Tasks, Status } from "./Data";
import "./App.scss";

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY },
  ).element;
}
function App() {
  const [dragAndDrop, setDragAndDrop] = React.useState(initialDnDState);
  const [list] = React.useState(Tasks);

  const startDragging = (event) => {
    const initialPosition = event.currentTarget.id;
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list, // store the current state of "list"
    });
    event.dataTransfer.setData("text", initialPosition);
  };

  const updateDragAndDropState = (ev) => {
    const afterElement = getDragAfterElement(ev.currentTarget, ev.clientY);
    var data = ev.dataTransfer.getData("text");
    if (afterElement == null) {
      ev.currentTarget.append(document.getElementById(data));
    } else {
      afterElement.before(document.getElementById(data));
    }
  };

  const endDragging = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: "",
      isDragging: false,
    });
  };

  const receiveDraggedElements = (event) => {
    event.preventDefault();
  };

  return (
    <div className="main-wrapper">
      <LeftNav></LeftNav>

      <div className="main-section">
        <Search></Search>
        <div className="grid-container">
          {Status.map((ele, i) => (
            <div key={i} className="grid-items">
              {ele.name}
            </div>
          ))}

          {Status.map((ele, i) => (
            <div
              key={i}
              id={ele.name}
              className="grid-items"
              onDrop={updateDragAndDropState}
              onDragOver={receiveDraggedElements}
            >
              {list[ele.id].map((el, i) => (
                <div
                  key={i}
                  id={el.id}
                  data-position={el.id}
                  className={`draggable ${
                    dragAndDrop.draggedFrom === el.id ? "dragging" : ""
                  }`}
                  draggable="true"
                  onDragStart={startDragging}
                  onDragEnd={endDragging}
                >
                  <Items el={el}></Items>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// App.propTypes = {};

export default App;
