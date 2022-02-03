import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { UserContext } from '../../lib/Auth';
import Modal from './Modal';

const LikeButton = ( props ) => {
  const path = useLocation().pathname;
  const { user, token } = useContext(UserContext);
  const [ showModal, setShowModal ] = useState(false);

  const getLike = async () => {
    if (user) {
      console.log(user)
      const id = path.split("/");
      const param = { method: "POST",
                      headers: { "Content-Type": "application/json;"
                                , "Authorization": "Bearer " + token},
                      body: JSON.stringify({ "notice_id": id[id.length - 1] })
                      };
      const response = await fetch("http://localhost:8000"+path+"/getLike", param);
      const data = await response.json();
      if (response.status === 200) {
        props.setBtnStatus({ "like": data.like ? "active" : "", "hate": data.hate ? "active" : ""})
      }
    }
  }

  const btnClick = () => {
    !user ? setShowModal(true) : props.data.likeButtonEvent()
    getLike();
  }
  useEffect(() => {
    getLike();
  }, []);

  return (
    <>
      <button type="button" className={ "btn btn-outline-primary m-1 px-4 " + (user ? props.btnStatus.like : "") } onClick={ btnClick } >
        <i className="bi bi-hand-thumbs-up"></i>
        { props.data.data.like_cnt }
      </button>
      <Modal
        showModal={ showModal }
        setShowModal={ setShowModal }
        msg="Loginしてください"
      />
    </>
  );
}

export default LikeButton;
