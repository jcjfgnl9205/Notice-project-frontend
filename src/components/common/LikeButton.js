import React, { useContext } from 'react';
import { UserContext } from '../../lib/Auth';

const LikeButton = ( props ) => {
  const { user } = useContext(UserContext);

  const btnClick = async () => {
    !user ? props.data.setShowModal(true) : await props.data.likeButtonEvent();
    props.data.getLikeCount();
  }

  return (
    <>
      <button type="button" className={ "btn btn-outline-primary m-1 px-4 " + (user ? props.data.btnStatus.like : "") } onClick={ btnClick } >
        <i className="bi bi-hand-thumbs-up"></i>
        { props.data.data.like_cnt }
      </button>
    </>
  );
}

export default LikeButton;
