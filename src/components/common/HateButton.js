import React from 'react';

const HateButton = ( props ) => {

  const btnClick = () => {
    !props.user ? props.setShowModal(true) : props.data.hateButtonEvent();
    props.data.getLikeCount();
  }

  return (
    <>
      <button type="button" className={ "btn btn-outline-danger m-1 px-4 " + (props.user ? props.data.btnStatus.hate : "") } onClick={ btnClick }>
        <i className="bi bi-hand-thumbs-down"></i>
        { props.data.data.hate_cnt }
      </button>
    </>
  );
}

export default HateButton;
