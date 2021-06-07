import React from "react";
import PropTypes from "prop-types";

export default function CounterText({ counter }) {
  return <div className="counter-value">Counter Value : {counter}</div>;
}

CounterText.propTypes = {
  counter: PropTypes.number || PropTypes.string,
};
