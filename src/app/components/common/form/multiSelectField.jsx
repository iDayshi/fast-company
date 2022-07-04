import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({
  options,
  onChange,
  name,
  label,
  defaultValue,
  error
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.values(options)
      : options;

  const handleChange = (value) => {
    onChange({ name: name, value });
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      color: "black"
    })
  };

  return (
    <>
      <div className="mb-4">
        <label className="form-label">{label}</label>

        <Select
          isMulti
          closeMenuOnSelect={false}
          defaultValue={defaultValue}
          options={optionsArray}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
          name={name}
          styles={customStyles}
        />
        {error && <p className="text-danger">{error}</p>}
      </div>
    </>
  );
};
MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.array,
  error: PropTypes.string
};

export default MultiSelectField;
