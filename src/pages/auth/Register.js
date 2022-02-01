import React, { useState, useRef, useEffect, useContext } from 'react';
import Alert from "../../components/common/Alert";
import Modal from "../../components/common/Modal";
import { UserContext } from '../../lib/Auth';


const userCreate = {
  username: "",
  password: "",
  password2: "",
  email: "",
  firstname: "",
  lastname: "",
}

const Register = () => {

  const [ createUser, setCreateUser ] = useState(userCreate);
  const [ msg, setMsg ] = useState('');
  const [ showModal, setShowModal ] = useState(false);
  const { username, password, password2, email, firstname, lastname } = createUser; 
  const { token, SignUp } = useContext(UserContext);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onChange = e => {
    const { value, name } = e.target;
    setCreateUser({
      ...createUser, //Inputをコビーする
      [name]: value
    });
  };

  const openModal = () => {
    if (validateForm()) {
      setMsg('');
      setShowModal(prev => !prev)
    }
  }

  // Inputチェック
  const validateForm = () => {
    setShowModal(false);

    if (!username) {
      setMsg('usernameを入力してください。');
      return false;
    }
    if (!password) {
      setMsg('passwordを入力してください。');
      return false;
    }
    if (!password2) {
      setMsg('passwordCheckを入力してください。');
      return false;
    }
    if (!email) {
      setMsg('Emailを入力してください。');
      return false;
    }
    if (password !== password2) {
      setMsg('passwordとpasswordCheckを確認してください。');
      return false;
    }

    return true;
  }

  const createUserFunc = e => {
    e.preventDefault();
    const data = { username: username
                  , email: email
                  , first_name: firstname
                  , last_name: lastname
                  , password: password
                  , is_active: true};
    SignUp(data);

  }

  const errorMsg = msg ? <Alert msg={msg} className="alert alert-warning"/> : null;

  return (
    <>
      <form className="w-75 p-5 mx-auto">
        <h3>新規登録</h3>
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
              value={ createUser.username }
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
              value={ createUser.password }
              autoComplete="on" />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="passwordCheck" className="col-sm-3 col-form-label">passwordCheck</label>
          <div className="col-sm-9">
            <input
              type="password"
              className="form-control"
              id="passwordCheck"
              name="password2"
              placeholder="********"
              minLength="8"
              maxLength="16"
              onChange={ onChange }
              value={ createUser.password2 }
              autoComplete="on" />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="Email" className="col-sm-3 col-form-label">Email</label>
          <div className="col-sm-9">
            <input
              type="email"
              className="form-control"
              id="Email"
              name="email"
              placeholder="travel@gmail.com"
              minLength="10"
              maxLength="50"
              onChange={ onChange }
              value={ createUser.email }
              autoComplete="on" />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="FirstName" className="col-sm-3 col-form-label">FirstName</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="FirstName"
              name="firstname"
              placeholder="xxxx"
              onChange={ onChange }
              value={ createUser.firstname }
              autoComplete="on" />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="LastName" className="col-sm-3 col-form-label">LastName</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="LastName"
              name="lastname"
              placeholder="xxxx"
              onChange={ onChange }
              value={ createUser.lastname }
              autoComplete="on" />
          </div>
        </div>

        <button type="button" className="btn btn-outline-primary m-1" onClick={ openModal }>Confirm</button>
        <button type="button" className="btn btn-outline-danger m-1" onClick={() => window.location.href = "/"}>Cancel</button>

        { errorMsg }
        <Modal
          showModal={ showModal }
          setShowModal={ setShowModal }
          msg="会員登録します。"
          onClick={ createUserFunc }
        />
      </form>
    </>
  );
}

export default Register;
