import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";
import "bootstrap/dist/css/bootstrap.css";

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

  if (users.length === 0) {
    return (
      <h2>
        <span className="badge bg-danger">Никто с тобой не тусанёт</span>
      </h2>
    );
  }

  return (
    <>
      {SearchStatus(users)}
      <Users
        onDelete={handleDelete}
        onToggleBookMark={handleToogleBookMark}
        users={users}
      />
    </>
  );
}

export default App;
