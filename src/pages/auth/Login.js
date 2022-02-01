import React, { useState, useRef, useEffect, useContext } from 'react';
import Alert from "../../components/common/Alert";
import { UserContext } from "../../lib/Auth";


const Login = () => {
  const [ loginUser, setLoginUser ] = useState({ username: "", password: "" });
  const [ msg, setMsg ] = useState('');
  const { username, password } = loginUser; 
  const { login } = useContext(UserContext);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onChange = e => {
    const { value, name } = e.target;
    setLoginUser({
      ...loginUser,
      [name]: value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    login(username, password)
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
