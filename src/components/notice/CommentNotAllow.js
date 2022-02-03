  import React from 'react';



const CommentNotAllow = props => {


  return (
  <>
    <div onClick={ () => props.setShowModal(true) }>
      <h6 className="font-weight-bold text-center">
        コメントを作成
      </h6>
      <p className="text-center">
        ログインしてください。
      </p>
    </div>
  </>
  );
}

export default CommentNotAllow;
