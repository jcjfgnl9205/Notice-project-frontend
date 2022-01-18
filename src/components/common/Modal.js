import React from 'react';
import styled from 'styled-components';

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


const Modal = ( props ) => {

  return (
    <>
      {props.showModal ? (
        <Background>
          <ModalContent>
            <CloseButton onClick={() => props.setShowModal(prev => !prev)}>&times;</CloseButton>
            <strong>{ props.msg }</strong>
            <div className="mt-4">
              <button className="btn btn-outline-primary m-1" onClick={ props.onClick }>Confirm</button>
              <button className="btn btn-outline-danger m-1" onClick={() => props.setShowModal(prev => !prev)}>Cancel</button>
            </div>
          </ModalContent>
        </Background>
      ) : null}
    </>
  );
}

export default Modal;
