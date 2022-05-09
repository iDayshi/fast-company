import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem
}) => {
  return (
    <ul className="list-group d-flex flex-row justify-content-center align-items-center">
      {Object.keys(items).map((item) => (
        <li
          key={items[item][valueProperty]}
          className={
            "list-group-item list-group-item-action list-group-item-dark" +
            (items[item] === selectedItem ? " active" : "")
          }
          onClick={() => onItemSelect(items[item])}
          role="button"
        >
          <h6>{items[item][contentProperty]}</h6>
        </li>
      ))}
    </ul>
  );
};

GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
};

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object
};

export default GroupList;
