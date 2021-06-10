import React, { useEffect, useRef, useCallback, useContext } from "react";
// import fetch from "node-fetch";
// components
import CounterText from "./CounterText";
import CounterLoader from "./CounterLoader";
import PropTypes from "prop-types";
// Decorator
import Debounce from "../../Decorators/Debounce";
// Common
import Button from "../Common/Button";
import InputText from "../Common/InputText";
// context
import { CounterContext } from "../../Context/CounterContext";

function Counter({ counterProps: { maxCount, minCount } }) {
  const { counter, loading, fetchCount, setCounter, setLoading } =
    useContext(CounterContext);

  const isFirstRender = useRef(true);
  const updateCounter = async (count) => {
    let options = {
      method: "PUT",
      body: JSON.stringify({ counter1: Number(count) }),
      headers: { "Content-Type": "application/json" },
    };
    fetchCount(options);
  };

  const debounce = useCallback(Debounce(updateCounter, 500), []);

  useEffect(() => {
    fetchCount();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }

    if (counter === "") {
      return;
    }
    setLoading(true);
    debounce(counter);
  }, [counter, setCounter]);

  const handleChange = useCallback(
    (event) => {
      let val = Number(event.target.value);
      if ((val <= maxCount && val >= minCount) || event.target.value === "") {
        if (isFirstRender.current) {
          isFirstRender.current = false;
        }

        event.target.value === ""
          ? setCounter(event.target.value)
          : setCounter(val);
      }
    },
    [setCounter],
  );

  const decrement = useCallback(() => {
    setCounter((prevCount) => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
      }
      if (minCount < prevCount && prevCount) {
        return prevCount - 1;
      } else {
        return prevCount;
      }
    });
  }, [setCounter]);

  const increment = useCallback(() => {
    setCounter((prevCount) => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
      }
      if (prevCount < maxCount) {
        return prevCount + 1;
      } else {
        return prevCount;
      }
    });
  }, [setCounter]);

  return (
    <>
      <CounterLoader loading={loading}></CounterLoader>
      <div className="counterContainer">
        <Button className="decrement" onClickHandler={decrement}>
          -
        </Button>
        <InputText input={counter} handleChange={handleChange} size="1" />
        <Button className="increment" onClickHandler={increment}>
          +
        </Button>
      </div>
      <CounterText counter={counter}></CounterText>
    </>
  );
}

Counter.propTypes = {
  counterProps: PropTypes.object,
};

export default React.memo(Counter);
