import React, { useState } from 'react';
import Alert from '../common/Alert';

const CommentCreate = (props) => {
  const [ comment, setComment ] = useState('');
  const [ msg, setMsg ] = useState('');
  const onChange = e => {
    const { value } = e.target;
      setComment(value);
  }

  const validation = (value) => {
    if (value === '') {
      setMsg("Commentを入力してください。");
      return false;
    }
    return true;
  }

  const create = async () => {
    if (validation(comment)) {
      await props.create(comment);
      setComment('');
      setMsg('');
    }
  }

  const errorMsg = msg ? <Alert msg={ msg } className="alert alert-warning"/> : null;

  return (
    <>
    <div>
      <h4>Comments</h4>
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
                      onChange={ onChange } />
          </div>
        </div>
      </div>
      <div className="col-md-12">
          <button type="button" className="btn btn-outline-primary btn-sm m-1" onClick={ () => create() } >Submit</button>
      </div> 
    </div>
    { errorMsg }
    </>
  );
}

export default CommentCreate;
