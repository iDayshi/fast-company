import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.default.fetchAll().then((user) => setUsers(user));
  }, []);

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

  return (
    <>
      {!users ? (
        <div className="d-flex justify-content-center align-items-center  min-vh-100 min-vw-100">
          <h2>
            <div className="spinner-grow text-info" role="status">
              <span className="visually m-5">2сек...</span>
            </div>
          </h2>
        </div>
      ) : (
        <Users
          onToggleBookMark={handleToogleBookMark}
          onDelete={handleDelete}
          users={users}
        />
      )}
    </>
  );
}

export default App;
