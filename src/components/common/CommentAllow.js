import React, { useState } from 'react';
import Alert from './Alert';

const CommentAllow = (props) => {

  const [ comment, setComment ] = useState('');
  const [ msg, setMsg ] = useState('');

  const onChange = e => {
    const { value, name } = e.target;
    setComment(value);
  }

  const validateForm = () => {
    if (!comment) {
      setMsg('commentを入力してください。');
      return false;
    }
    return true;
  }

  const onSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      props.commentOnSubmit(comment);
      setComment('');
    }
  }

  const errorMsg = msg ? <Alert msg={msg} className="alert alert-warning"/> : null;

  return (
    <>
      <h4>Comments</h4>
      <form onSubmit={ onSubmit }>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <textarea className="form-control" id="comments" rows="3" cols="50" placeholder="Comment" maxLength="1000" style={{resize: 'none'}} value={ comment } onChange={ onChange } ></textarea>
            </div>
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-outline-primary btn-sm m-1">Submit</button>
          </div>
        </div>
      </form>
      { errorMsg }
    </>
  );
}

export default CommentAllow;
