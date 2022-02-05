import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Alert from '../common/Alert';

const CommentAllow = (props) => {

  const [ comment, setComment ] = useState('');
  const [ msg, setMsg ] = useState('');
  const path = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if(props.comment) {
      setComment(props.comment.comment);
    }
  }, [])

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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
        await props.commentOnSubmit(comment);
        setComment('');
    }
    props.setCommentPaginate(1);
    navigate(`${path}?page=1`);
  }
  
  const errorMsg = msg ? <Alert msg={msg} className="alert alert-warning"/> : null;

  return (
    <>
      {
        props.cmd
        ? null
        : <h4>Comments</h4>
      }
      <form onSubmit={ onSubmit }>
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
          {
            props.cmd
            ? null
            : <div className="col-md-12">
                <button type="submit" className="btn btn-outline-primary btn-sm m-1">Submit</button>
              </div>
          }
        </div>
      </form>
      { errorMsg }
    </>
  );
}

export default CommentAllow;
