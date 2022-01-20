import React, { useState, useRef, useEffect } from 'react';
import Alert from "../../components/common/Alert";
import { setToken } from "../../lib/Auth";

const user = {
  username: "",
  password: ""
}

const Login = () => {
  const [ loginUser, setLoginUser ] = useState(user);
  const [ msg, setMsg ] = useState('');
  const { username, password } = loginUser; 
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onChange = e => {
    const { value, name } = e.target;
    setLoginUser({
      ...loginUser, //Inputをコビーする
      [name]: value
    });
  };

  const onSubmit = e => {
    console.log(username);

    e.preventDefault();
    const data = { username: username, password: password};
    const param = { method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify(data)
            };

    fetch("http://localhost:8000/auth/login", param)
      .then( response => { return response.json() })
      .then( response => {
        if (response.detail) {
          setMsg(response.detail);
          return;
        }

        // tokenが存在すればcookieに保存する
        if (response.access_token) {
          setToken(response.access_token, {path: "/"});
          window.location.href = "/";
        }
    });
  }

  const errorMsg = msg ? <Alert msg={msg} className="alert alert-warning"/> : null;

  return (
    <>
      <form onSubmit={ onSubmit } className="w-75 p-5 mx-auto">
        <h3>Login</h3>
        <div className="mb-3 row">
          <label htmlFor="username" className="col-sm-3 col-form-label">username</label>
          <div className="col-sm-9">
            <input
              ref={ inputRef }
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="username"
              minLength="8"
              maxLength="16"
              onChange={ onChange }
              value={ loginUser.username }
              autoComplete="on" />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="password" className="col-sm-3 col-form-label">password</label>
          <div className="col-sm-9">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="********"
              minLength="8"
              maxLength="16"
              onChange={ onChange }
              value={ loginUser.password }
              autoComplete="on" />
          </div>
        </div>
        <button type="submit" className="btn btn-outline-primary m-1">Login</button>

        { errorMsg }
      </form>
    </>
  );
}

export default Login;
