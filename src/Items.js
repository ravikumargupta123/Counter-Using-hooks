import React from "react";
import PropTypes from "prop-types";

function Items({ el }) {
  return (
    <>
      <div className="description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
        corporis?
      </div>
      <div className="info">Lorem ipsum dolor sit amet.</div>
      <div className="footer">
        <div className="left">{el.status}</div>
        <div className="right">right</div>
      </div>
    </>
  );
}

Items.propTypes = {
  el: PropTypes.object,
};

export default Items;
