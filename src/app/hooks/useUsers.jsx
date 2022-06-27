import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userServisece from "../services/user.service";
import { toast } from "react-toastify";

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvaider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function getUserById(userId) {
    return users.find((u) => u._id === userId);
  }

  async function getUsers() {
    try {
      const { content } = await userServisece.get();
      setUsers(content);
      setLoading(false);
    } catch {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }
  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {!isLoading ? children : "Загрузка пользователей...."}
    </UserContext.Provider>
  );
};

UserProvaider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default UserProvaider;
