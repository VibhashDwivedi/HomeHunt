import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useUserContext from "../UserContext";

const Navbar = () => {
  const { loggedIn, logout, buyer, seller } = useUserContext();
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
              {loggedIn ? null : (
              <NavLink className="nav-link" to="/home">
                <button className="btn btn-primary rounded-0">Home</button>
              </NavLink>)}
            </li>
            <li className="nav-item">
              {seller ? (
              <NavLink className="nav-link d-hidden" to="/addhouse">
                <button className="btn btn-primary rounded-0">Add House</button>
              </NavLink> )
              : null}
            </li>
            <li className="nav-item">
              {seller ? (
              <NavLink className="nav-link d-hidden" to="/myhouses">
                <button className="btn btn-primary rounded-0">My Houses</button>
              </NavLink> )
              : null}
            </li>
            <li className="nav-item">
              {buyer ? (
              <NavLink className="nav-link d-hidden" to="/houses">
                <button className="btn btn-primary rounded-0">Browse</button>
              </NavLink> )
              : null}
            </li>

            <li className="nav-item">
              {loggedIn ? (
                <NavLink className="nav-link" to="/" >
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
