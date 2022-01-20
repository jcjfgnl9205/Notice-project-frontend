import React from 'react';
import { Link } from 'react-router-dom';
import { removeToken } from "../../lib/Auth";

const Navbar = ({ auth }) => {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse">
        <Link className="navbar-brand" to="/">Home</Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="#">Page1</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">Page2</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">Page3</Link>
          </li>
        </ul>
      </div>
      <div className="d-flex">
      { auth
        ? <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="#">Username</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-link text-dark" style={{ textDecoration: 'none'}} onClick={ removeToken }>Logout</button>
            </li>
          </ul>
        : <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/login">SignIn</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">SignUp</Link>
            </li>
          </ul>
      }
      </div>
    </nav>
  );
}

export default Navbar;
