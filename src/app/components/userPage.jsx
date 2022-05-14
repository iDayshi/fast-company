import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const UsersPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.default.getById(userId).then((data) => setUser(data));
  });
  const handleClick = () => {
    history.push("/users");
  };
  if (user) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle w-50 p-3 mb-2 bg-dark text-white d-flex justify-content-center align-items-center flex-column">
        <h2>
          <img
            src={`/avatars/${user._id}.jpg`}
            className="img-thumbnail"
            alt="..."
          />
        </h2>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <h4>
          Качества:
          <QualitiesList qualities={user.qualities} />
        </h4>
        <h4>Количество встреч: {user.completedMeetings}</h4>
        <h4>Рейтинг: {user.rate} из 5</h4>
        <button type="button" className="btn btn-info" onClick={handleClick}>
          Вернуться назад
        </button>
      </div>
    );
  } else {
    return <h1>Загрузка пользователя...</h1>;
  }
};

UsersPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UsersPage;
