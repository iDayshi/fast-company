import React from "react";
import { useParams } from "react-router-dom";
import UsersPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
  const params = useParams();
  const { userId } = params;
  return <> {userId ? <UsersPage userId={userId} /> : <UsersListPage />}</>;
};

export default Users;
