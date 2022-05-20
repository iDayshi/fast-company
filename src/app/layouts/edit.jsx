import React from "react";
import { useParams } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage.jsx/editUserPage";

const Edit = () => {
  const params = useParams();
  const { userId } = params;
  return (
    <>
      <EditUserPage userIdEdit={userId} />
    </>
  );
};
export default Edit;
