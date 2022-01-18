import React, { useState } from 'react';
import InputField from "../../components/common/InputField";
import Alert from "../../components/common/Alert";

const user = {
  username: "",
  password: ""
}

const Login = () => {

  const [ loginUser, setLoginUser ] = useState(user);
  const [ msg, setMsg ] = useState('');
  const { username, password } = loginUser; 

  const onChange = e => {
    const { value, name } = e.target;
    setLoginUser({
      ...loginUser, //Inputをコビーする
      [name]: value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
  }

  const errorMsg = msg ? <Alert msg={msg} className="alert alert-warning"/> : null;

  return (
    <>
      <form onSubmit={ onSubmit } className="w-75 p-5 mx-auto">
        <h3>Login</h3>
        <InputField
          label="username"
          type="text"
          name="username"
          value={ loginUser.username }
          minLength={ 8 }
          maxLength={ 16 }
          placeholder="username"
          onChange={ onChange }
        />
        <InputField
          label="password"
          type="password"
          name="password"
          value={ loginUser.password }
          minLength={ 8 }
          maxLength={ 16 }
          placeholder="********"
          onChange={ onChange }
        />
        <button type="submit" className="btn btn-outline-primary m-1">Login</button>

        { errorMsg }
      </form>
    </>
  );
}

export default Login;
