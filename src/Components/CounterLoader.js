import React from "react";
import PropTypes from "prop-types";

export default function CounterLoader({ loading }) {
  return (
    <div className={`counter-loader ${!loading ? "hidden" : ""}`}>
      <span className="loader"></span>
      Saving counter value
    </div>
  );
}

CounterLoader.propTypes = {
  loading: PropTypes.bool,
};
