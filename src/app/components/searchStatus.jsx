import React from 'react';

const SearchStatus = ({ length }) => {
  return (
    <h2>
      <span className="badge bg-primary">{`${length} человек${cheakEnding(
        length
      )} тусанёт с тобой сегодня`}</span>
    </h2>
  );
};

const cheakEnding = (num) => {
  if (num >= 2 && num <= 4) {
    return 'а';
  } else {
    return '';
  }
};

export default SearchStatus;
