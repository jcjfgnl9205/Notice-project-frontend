import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate} from "react-router-dom";
import Navbar from './components/common/Navbar';
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/common/Home';
import NotFound from './pages/common/NotFound';
import { getToken } from "./lib/Auth";

const App = () => {

  const [token, setToken] = useState(null);
  const auth = token != null;
  useEffect(() => {
    getToken("access-token") ? setToken(getToken("access-token")) : setToken(null);
  }, [])

  return (
    <Router>
      <div>
        <Navbar auth={auth} />
        <div className="container">
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/login" element={auth ? <Navigate to="/" /> : <Login />}/>
            <Route path="/register" element={auth ? <Navigate to="/" /> : <Register />}/>

            <Route path="*" element={ <Navigate to="/notFound" /> } />
            <Route path="/notFound" element={ <NotFound /> } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
