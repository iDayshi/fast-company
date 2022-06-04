import React from "react";
import { useParams } from "react-router-dom";
import UserProvaider from "../hooks/useUsers.jsx";
import EditUserPage from "../components/page/editUserPage.jsx";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  return (
    <>
      <UserProvaider>
        {userId ? (
          edit ? (
            <EditUserPage />
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvaider>
    </>
  );
};

export default Users;
