import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useSelector, useDispatch } from "react-redux";
import {
  getQualitiesLoadingStatus,
  getQualitiesByIds,
  loadingQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = useSelector(getQualitiesByIds(qualities));

  useEffect(() => {
    dispatch(loadingQualitiesList());
  }, []);

  if (isLoading) return "Загрузка...";
  return (
    <>
      {qualitiesList.map((qual) => (
        <Qualitie key={qual._id} {...qual} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
