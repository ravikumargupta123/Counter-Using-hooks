import React from "react";
import PropTypes from "prop-types";

function CounterText({ counter }) {
  return <div className="counter-value">Counter Value : {counter}</div>;
}

CounterText.propTypes = {
  counter: PropTypes.any,
};

export default React.memo(CounterText);
