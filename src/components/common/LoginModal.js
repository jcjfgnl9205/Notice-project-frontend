import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../lib/Auth';

const Background = styled.div`
position: fixed;
z-index: 1;
padding-top: 100px;
left: 0;
top: 0;
width: 100%;
height: 100%;
overflow: auto;
background-color: rgb(0,0,0);
background-color: rgba(0,0,0,0.4);
`;

const ModalContent = styled.div`
background-color: #fefefe;
margin: auto;
padding: 20px;
border: 1px solid #888;
width: 40%;
`;

const CloseButton = styled.span`
color: #aaaaaa;
float: right;
font-size: 28px;
font-weight: bold;
&:hover {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
`;


const LoginModal = ( props ) => {
  const { login } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(e.target.username.value, e.target.password.value);
    props.setShowModal(false);
  }

  return (
    <>
      {props.showModal ? (
        <Background>
          <ModalContent>
            <CloseButton onClick={() => props.setShowModal(prev => !prev)}>&times;</CloseButton>
              <strong>{ props.msg }</strong>
              <div className="mt-4">
                <form onSubmit={ onSubmit }>
                  <div className="mb-3 row">
                    <label htmlFor="username" className="col-sm-3 col-form-label">username</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="username"
                        minLength="8"
                        maxLength="16"
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
                        autoComplete="on" />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-outline-primary m-1">Confirm</button>
                  <button type="button" className="btn btn-outline-danger m-1" onClick={() => props.setShowModal(prev => !prev)}>Cancel</button>
                </form>
              </div>
          </ModalContent>
        </Background>
      ) : null}
    </>
  );
}

export default LoginModal;
