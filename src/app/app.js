import React, { useState } from 'react';
import Users from './components/users';
import SearchStatus from './components/searchStatus';
import api from './api';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const handleToogleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          user.bookmark = !user.bookmark;
        }
        return user;
      })
    );
  };

  if (!users.length) {
    return (
      <h2>
        <span className="badge bg-danger">Никто с тобой не тусанёт</span>
      </h2>
    );
  }
  return (
    <>
      {SearchStatus(users)}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился,раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <Users
              key={user._id}
              onDelete={handleDelete}
              onFavorites={handleToogleBookMark}
              {...user}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
