import React from "react";
import PropTypes from "prop-types";

function InputText(props) {
  const { input, handleChange, ...rest } = props;
  return (
    <input
      type="text"
      name={toString(input)}
      id={toString(input)}
      value={input}
      onChange={handleChange}
      {...rest}
    />
  );
}

InputText.propTypes = {
  input: PropTypes.any,
  handleChange: PropTypes.func,
};

export default React.memo(InputText);
