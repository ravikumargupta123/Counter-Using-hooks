import React, { useState, useEffect, useRef } from "react";
import fetch from "node-fetch";
import CounterText from "./Components/CounterText";
import CounterLoader from "./Components/CounterLoader";

import "./App.scss";

const initialCounter = 1;
const maxCount = 1000;
const minCount = 1;
function App() {
  const [counter, setCounter] = useState(initialCounter);
  const [loading, setLoading] = useState(true);
  const isFirstRender = useRef(true);

  console.log("APP", counter);

  const updateCounter = async () => {
    setLoading(true);
    let response = await fetch(
      "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json",
      {
        method: "PUT",
        body: JSON.stringify({ counter1: Number(counter) }),
        headers: { "Content-Type": "application/json" },
      },
    );
    let json = await response.json();
    setCounter(json.counter1);
    setLoading(false);
  };

  useEffect(() => {
    async function fetchCount() {
      let response = await fetch(
        "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json",
      );
      let json = await response.json();
      if (json) {
        setCounter(json.counter1);
      }
      setLoading(false);
    }
    fetchCount();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // toggle flag after first render/mounting
      return;
    }
    if (!loading) {
      updateCounter();
    }
  }, [counter]);

  const handleChange = (event) => {
    if (!(event.target.value > maxCount)) {
      setCounter(event.target.value);
    }
  };

  const increment = () => {
    if (counter < maxCount && counter) {
      setCounter(counter + 1);
    }
  };

  const decrement = () => {
    if (minCount < counter && counter) {
      setCounter(counter - 1);
    }
  };

  return (
    <>
      <CounterLoader loading={loading}></CounterLoader>
      <div className="counterContainer">
        <button className="decrement" onClick={decrement}>
          <span>-</span>
        </button>
        <input
          type="text"
          name="counter"
          id="counter"
          value={counter}
          onChange={handleChange}
          size="1"
        />
        <button className="increment" onClick={increment}>
          <span>+</span>
        </button>
      </div>
      <CounterText counter={counter}></CounterText>
    </>
  );
}

export default React.memo(App);
