import React, { useContext } from 'react';
import { UserContext } from '../../lib/Auth';

const HateButton = ( props ) => {
  const { user } = useContext(UserContext);

  const btnClick = async () => {
    !user ? props.data.setShowModal(true) : await props.data.hateButtonEvent();
    props.data.getLikeCount();
  }

  return (
    <>
      <button type="button" className={ "btn btn-outline-danger m-1 px-4 " + (user ? props.data.btnStatus.hate : "") } onClick={ btnClick }>
        <i className="bi bi-hand-thumbs-down"></i>
        { props.data.data.hate_cnt }
      </button>
    </>
  );
}

export default HateButton;
