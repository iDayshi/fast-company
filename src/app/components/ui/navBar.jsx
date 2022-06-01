import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <>
      <nav className="nav nav-pills flex-column flex-sm-row">
        <Link
          className="nav-link text-sm-center nav-link active m-1"
          aria-current="page"
          to="/"
        >
          Main
        </Link>
        <Link
          className="nav-link text-sm-center nav-link active m-1"
          to="/login"
        >
          Login
        </Link>
        <Link
          className="nav-link text-sm-center nav-link active m-1"
          to="/users"
        >
          Users
        </Link>
      </nav>
    </>
  );
};

export default NavBar;
