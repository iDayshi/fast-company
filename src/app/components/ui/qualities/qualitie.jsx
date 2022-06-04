import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Qualitie = ({ _id }) => {
  const { name, color } = useQualities().getQualities(_id);
  return <span className={"badge m-1 bg-" + color}>{name}</span>;
};

Qualitie.propTypes = {
  _id: PropTypes.string.isRequired,
  color: PropTypes.string,
  name: PropTypes.string
};
export default Qualitie;
