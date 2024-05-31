import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useUserContext from "../UserContext";

const Navbar = () => {
  const { loggedIn, logout } = useUserContext();
  return (
    <nav className="navbar navbar-expand-lg header-bar">
      <div className="container">
        <NavLink
          className="navbar-brand  display-2 fs-2 fw-bold text-white title2"
          to="/home"
        >
          Rentify
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                <button className="btn btn-primary rounded-0">Home</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/addhouse">
                <button className="btn btn-primary rounded-0">Add House</button>
              </NavLink>
            </li>

            <li className="nav-item">
              {/* <NavLink className="nav-link" to="/login">
                <button className="btn btn-primary rounded-0">Login</button>
              </NavLink> */}
              {loggedIn ? (
                <NavLink className="nav-link" to="/home">
                  <button className="btn btn-danger rounded-0" onClick={logout}>
                    Logout
                  </button>
                </NavLink>
              ) : (
                <NavLink className="nav-link" to="/login">
                  <button className="btn btn-primary rounded-0">Login</button>
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
