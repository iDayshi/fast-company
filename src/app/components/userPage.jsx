import React from "react";
import { useHistory } from "react-router-dom";

const UsersPage = (user) => {
  const history = useHistory();
  const handleSave = () => {
    history.push("/users");
  };
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
        Качества:{" "}
        {user.qualities.map((qualiti) => (
          <span key={qualiti._id} className={"badge m-1 bg-" + qualiti.color}>
            {qualiti.name}
          </span>
        ))}
      </h4>
      <h4>Количество встреч: {user.completedMeetings}</h4>
      <h4>Рейтинг: {user.rate} из 5</h4>
      <button
        type="button"
        className="btn btn-info"
        onClick={() => handleSave()}
      >
        Вернуться назад
      </button>
    </div>
  );
};

export default UsersPage;
