import React from "react";
import PropTypes from "prop-types";

function Button({ children, className, onClickHandler }) {
  return (
    <button className={className} onClick={onClickHandler}>
      <span>{children}</span>
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  onClickHandler: PropTypes.func,
  className: PropTypes.string,
};

export default React.memo(Button);
