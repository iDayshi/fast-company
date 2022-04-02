import React from 'react';

const Bookmark = ({ status, ...rest }) => {
  const { _id, onFavorites } = rest;
  return (
    <button
      key={_id}
      className="btn btn-outline-danger btn-lg"
      onClick={() => onFavorites(_id)}
    >
      <i
        className={
          status
            ? 'bi bi-arrow-through-heart-fill'
            : 'bi bi-arrow-through-heart'
        }
      ></i>
    </button>
  );
};

export default Bookmark;
