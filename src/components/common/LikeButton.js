import React from 'react';

const LikeButton = ( props ) => {

  const btnClick = async () => {
    !props.user ? props.data.setShowModal(true) : await props.data.likeButtonEvent();
    props.data.getLikeCount();
  }

  return (
    <>
      <button type="button" className={ "btn btn-outline-primary m-1 px-4 " + (props.user ? props.data.btnStatus.like : "") } onClick={ btnClick } >
        <i className="bi bi-hand-thumbs-up"></i>
        { props.data.data.like_cnt }
      </button>
    </>
  );
}

export default LikeButton;
