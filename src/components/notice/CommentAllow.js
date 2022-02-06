import React, { useState } from 'react';
import Alert from '../common/Alert';

const CommentAllow = (props) => {

  const [ comment, setComment ] = useState(props.comment);

  const onChange = e => {
    const { value } = e.target;
      setComment(value);
  }

  const errorMsg = props.msg ? <Alert msg={ props.msg } className="alert alert-warning"/> : null;

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <textarea className="form-control" 
                      rows="3"
                      cols="50"
                      placeholder="Comment"
                      maxLength="1000"
                      style={{resize: 'none'}}
                      value={ comment }
                      ref={ props.textareaRef }
                      onChange={ onChange } />
          </div>
        </div>
      </div>
      { errorMsg }
    </>
  );
}

export default CommentAllow;
