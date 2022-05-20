import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.values(options)
      : options;

  const getQualities = (qualities) => {
    const newArrQualities = [];
    qualities.map((elem) =>
      newArrQualities.push({
        label: elem.name,
        value: elem._id,
        color: elem.color
      })
    );
    return newArrQualities;
  };

  const getQualitiesEdit = (elements) => {
    const newArrQualities = [];
    elements.map((elem) =>
      newArrQualities.push({
        _id: elem.value,
        name: elem.label,
        color: elem.color
      })
    );
    return newArrQualities;
  };

  defaultValue = getQualities(defaultValue);

  const handleChange = (value) => {
    onChange({ name: name, value: getQualitiesEdit(value) });
  };

  const customStyles = {
    menu: (provided, asdas) => ({
      ...provided,
      color: "black"
    })
  };

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        defaultValue={defaultValue}
        key={optionsArray.value}
        options={optionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
        styles={customStyles}
      />
    </div>
  );
};

MultiSelectField.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.array,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string,
  label: PropTypes.string
};

export default MultiSelectField;
