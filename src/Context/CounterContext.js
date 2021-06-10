import React, { createContext, useState, useCallback } from "react";
import fetch from "node-fetch";
import PropTypes from "prop-types";

export const CounterContext = createContext({});

const CounterContextProvider = ({ children, counterProps }) => {
  const [counter, setCounter] = useState(counterProps.initialCounter);
  const [loading, setLoading] = useState(true);

  const fetchCount = useCallback(
    async (options) => {
      let response = await fetch(
        "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json",
        options,
      );
      let json = await response.json();
      if (json) {
        setCounter(json.counter1);
      }
      setLoading(false);
    },
    [setCounter],
  );

  return (
    <CounterContext.Provider
      value={{ counter, loading, fetchCount, setCounter, setLoading }}
    >
      {children}
    </CounterContext.Provider>
  );
};

CounterContextProvider.propTypes = {
  children: PropTypes.node,
  counterProps: PropTypes.object,
};

export default React.memo(CounterContextProvider);
