import React, { useState } from 'react';
import InputField from "../../components/common/InputField";
import Alert from "../../components/common/Alert";
import Modal from "../../components/common/Modal";


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
    const param = { method: "POST",
                    headers: { "Content-Type": "application/json;" },
                    body: JSON.stringify(data)
                    };

    fetch("http://localhost:8000/auth/register", param)
      .then( response => { return response.json() })
      .then( response => {
        if (response.detail) {
          setMsg(response.detail);
          return;
        }
        // 新規登録に成功したらログインページへ移動する
        window.location.href = "/login";
      });
  }

  const errorMsg = msg ? <Alert msg={msg} className="alert alert-warning"/> : null;

  return (
    <>
      <form className="w-75 p-5 mx-auto">
        <h3>新規登録</h3>
        <InputField
          label="username"
          type="text"
          name="username"
          value={ createUser.username }
          minLength={ 8 }
          maxLength={ 16 }
          placeholder="username"
          onChange={ onChange }
        />
        <InputField
          label="password"
          type="password"
          name="password"
          value={ createUser.password }
          minLength={ 8 }
          maxLength={ 16 }
          placeholder="********"
          onChange={ onChange }
        />
        <InputField
          label="passwordCheck"
          type="password"
          name="password2"
          value={ createUser.password2 }
          minLength={ 8 }
          maxLength={ 16 }
          placeholder="********"
          onChange={ onChange }
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          value={ createUser.email }
          placeholder="travel@gmail.com"
          minLength={ 10 }
          maxLength={ 50 }
          onChange={ onChange }
        />
        <InputField
          label="FirstName"
          type="text"
          name="firstname"
          value={ createUser.firstname }
          placeholder="xxxx"
          onChange={ onChange }
        />
        <InputField
          label="LastName"
          type="text"
          name="lastname"
          value={ createUser.lastname }
          placeholder="xxxx"
          onChange={ onChange }
        />

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
