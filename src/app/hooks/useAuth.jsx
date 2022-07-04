import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userServisece from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, {
  setTokens
} from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
});

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvaider = ({ children }) => {
  const history = useHistory();
  const [currentUser, setUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 300),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким Email уже существует"
          };
          throw errorObject;
        }
      }
    }
  }

  async function signInWithPassword({ email, password }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        switch (message) {
          case "INVALID_PASSWORD" && "EMAIL_NOT_FOUND":
            throw new Error("Введён неверный Email или Password");

          default:
            throw new Error("Множественные попытки входа. Попробуйте позже");
        }
      }
    }
  }

  function logOut() {
    localStorageService.removeAuthData();
    setUser(null);
    history.push("/");
  }

  async function createUser(data) {
    try {
      const { content } = await userServisece.create(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getUserData() {
    try {
      const { content } = await userServisece.getCurrentUser();
      setUser(content);
    } catch {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateUserData(data) {
    try {
      const { content } = await userServisece.update(data);
      setUser(content);
    } catch {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signInWithPassword,
        currentUser,
        logOut,
        updateUserData
      }}
    >
      {!isLoading ? children : "Loading...."}
    </AuthContext.Provider>
  );
};

AuthProvaider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvaider;
