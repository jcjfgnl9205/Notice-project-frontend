import React, { createContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = props => {
  const [token, setToken] = useState(()=> localStorage.getItem('token') ? localStorage.getItem('token') : null)
  const [user, setUser] = useState(()=> localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : null)
  const [loading, setLoading] = useState(true)

  const updateToken = async () => {
    const param = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    };
    const response = await fetch("http://127.0.0.1:8000/auth/protected", param);
    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem("token", token);
    }
  }

  // 会員登録
  const SignUp = async (signUpUser) => {
    const param = { method: "POST",
                    headers: { "Content-Type": "application/json;" },
                    body: JSON.stringify(signUpUser)
                    };
    const response = await fetch("http://localhost:8000/auth/register", param);
    const data = await response.json();
    if (response.status === 200) {
      setToken(data.access_token);
      setUser(jwt_decode(data.access_token));
      localStorage.setItem("token", data.access_token);
    }
  }

  // Login
  const login = async (username, password) => {
    const param = { method: "POST",
                    headers: { "Content-Type": "application/json;" },
                    body: JSON.stringify({ 'username': username, 'password': password})
                    };

    const response = await fetch("http://localhost:8000/auth/login", param);
    const data = await response.json();
    if (response.status === 200) {
      setToken(data.access_token);
      setUser(jwt_decode(data.access_token));
      localStorage.setItem("token", data.access_token);
    }
  }

  // Logout
  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  let contextData = {
    user: user,
    token: token,
    login:login,
    logout: logout,
    SignUp: SignUp
  }

  useEffect(()=> {
    if(loading){
        updateToken()
    }

    let fourMinutes = 1000 * 60 * 4

    let interval =  setInterval(()=> {
        if(token){
            updateToken()
        }
    }, fourMinutes)
    return ()=> clearInterval(interval)

  }, [token, loading])

  return (
    <UserContext.Provider value={ contextData }>
      { props.children }
    </UserContext.Provider>
  );
};
