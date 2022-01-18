import React from 'react';


const Alert = ( props ) => {

  return (
    <div className="m-2">
      <div className={props.className} role="alert">{ props.msg }</div>
    </div>
  );
}

export default Alert;
