import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Home</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
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

        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/login">SignIn</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">SignUp</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
