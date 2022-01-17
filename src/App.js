import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './components/common/Navbar';
import Login from './pages/auth/Login'
import Home from './pages/home/home';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
