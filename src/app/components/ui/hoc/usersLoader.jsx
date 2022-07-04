import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadingUsersList } from "../../../store/users";

const UsersLoader = ({ children }) => {
  const dataStatus = useSelector(getDataStatus());
  const dispatch = useDispatch();
  useEffect(() => {
    if (!dataStatus) dispatch(loadingUsersList());
  }, []);
  if (!dataStatus) {
    return (
      <div className="container d-flex justify-content-center align-items-center m-10">
        <h2>
          <div className="spinner-grow text-info" role="status">
            <span className="visually m-5">Загрузка пользователей...</span>
          </div>
        </h2>
      </div>
    );
  }
  return children;
};

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default UsersLoader;
