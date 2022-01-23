import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = props => {
  const [token, setToken] = useState(localStorage.getItem("token") == null ? null : localStorage.getItem("token"));

  useEffect(() => {
    const fetchUser = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        
      };

      const response = await (await fetch("http://127.0.0.1:8000/auth/protected", requestOptions)).json();
      if (!response.current_user) {
        setToken(null);
      }
      localStorage.setItem("token", token);
    };
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={[token, setToken]}>
      { props.children }
    </UserContext.Provider>
  );
};
