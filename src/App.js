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

import Notices from './pages/notice/Notices';
import Notice from './pages/notice/Notice';
import NoticeCreate from './pages/notice/NoticeCreate';

const App = () => {

  const { token } = useContext(UserContext);

  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/login" element={token ? <Navigate to="/" /> : <Login />}/>
            <Route path="/register" element={token ? <Navigate to="/" /> : <Register />}/>

            <Route path="/notices" element={ <Notices /> } />
            <Route path="/notices/:id" element={ <Notice /> } />
            <Route path="/notices/create" element={ <NoticeCreate /> } />

            <Route path="*" element={ <Navigate to="/notFound" /> } />
            <Route path="/notFound" element={ <NotFound /> } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
