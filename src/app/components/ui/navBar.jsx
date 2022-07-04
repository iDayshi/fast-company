import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";
import NavProfole from "./navProfile";
const NavBar = () => {
  const ifLoggedIn = useSelector(getIsLoggedIn());

  return (
    <>
      <nav className="navbar bg-dark mb-3 bg-opacity-40">
        <div className="container-fluid">
          <ul className="nav nav-pills flex-column flex-sm-row">
            <li className="nav-item">
              <Link
                className="nav-link text-sm-center nav-link active m-1"
                aria-current="page"
                to="/"
              >
                Main
              </Link>
            </li>
            {ifLoggedIn && (
              <li className="nav-item">
                <Link
                  className="nav-link text-sm-center nav-link active m-1"
                  to="/users"
                >
                  Users
                </Link>
              </li>
            )}
          </ul>
          <div className="d-flex">
            {ifLoggedIn ? (
              <NavProfole />
            ) : (
              <Link
                className="nav-link text-sm-center nav-link active m-1"
                to="/login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
