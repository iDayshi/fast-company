import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadingUsersList
} from "../../../store/users";
import { loadingQualitiesList } from "../../../store/qualities";
import { loadingProfessionsList } from "../../../store/professions";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isloggedIn = useSelector(getIsLoggedIn());
  const usersStatusLoading = useSelector(getUsersLoadingStatus());
  useEffect(() => {
    dispatch(loadingQualitiesList());
    dispatch(loadingProfessionsList());
    if (isloggedIn) {
      dispatch(loadingUsersList());
    }
  }, [isloggedIn]);
  if (usersStatusLoading) {
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

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;
