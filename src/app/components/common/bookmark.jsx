import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
  return (
    <button className="btn btn-dark" {...rest}>
      <i className={"bi bi-suit-heart" + (status ? "-fill" : "")}></i>
    </button>
  );
};

BookMark.propTypes = {
  status: PropTypes.bool
};

export default BookMark;
