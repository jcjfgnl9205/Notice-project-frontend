import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../lib/Auth';

const Navbar = () => {

  const [token, setToken] = useContext(UserContext);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
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
      { token
        ? <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="#">Username</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-link text-dark" style={{ textDecoration: 'none'}} onClick={ handleLogout }>Logout</button>
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
