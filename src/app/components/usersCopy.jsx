import React, { useState } from 'react';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.css';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };
  const renderPhrase = (number) => {
    return (
      <h2>
        <span className="badge bg-primary">{`${
          users.length
        } человек${cheakEnding(users.length)} тусанёт с тобой сегодня`}</span>
      </h2>
    );
  };

  const renderUsers = () => {
    return (
      users.length !== 0 &&
      users.map((user) => (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{renderQualities(user)}</td>
          <td key={user.profession._id}>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate}/5</td>
          <td>
            <button
              key={user._id}
              className="btn btn-outline-danger btn-lg"
              onClick={() => handleDelete(user._id)}
            >
              delete
            </button>
          </td>
        </tr>
      ))
    );
  };

  const renderQualities = (nameUser) => {
    return (
      nameUser.qualities.length !== 0 &&
      nameUser.qualities.map((qualitie) => (
        <span key={qualitie._id} className={`badge bg-${qualitie.color} m-2`}>
          {qualitie.name}
        </span>
      ))
    );
  };

  const cheakEnding = (num) => {
    if (num >= 2 && num <= 4) {
      return 'а';
    } else {
      return '';
    }
  };

  if (users.length === 0) {
    return (
      <h2>
        <span className="badge bg-danger">Никто с тобой не тусанёт</span>
      </h2>
    );
  }

  return (
    <>
      {renderPhrase()}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился,раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </>
  );
};

export default Users;
