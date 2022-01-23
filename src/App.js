import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate} from "react-router-dom";
import { UserContext } from './lib/Auth';
import Navbar from './components/common/Navbar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/common/Home';
import NotFound from './pages/common/NotFound';

const App = () => {

  const [ token, setToken ] = useContext(UserContext);

  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/login" element={token ? <Navigate to="/" /> : <Login />}/>
            <Route path="/register" element={token ? <Navigate to="/" /> : <Register />}/>

            <Route path="*" element={ <Navigate to="/notFound" /> } />
            <Route path="/notFound" element={ <NotFound /> } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
