import React, { useRef, useState } from 'react';
import CommentAllow from './CommentAllow';

const Comments = (props) => {
  const [ updateFlg, setUpdateFlg ] = useState(false);
  const [ msg, setMsg ] = useState(null)
  const textareaValue = useRef();

  const validation = (value) => {
    if (value === '') {
      setMsg("Commentを入力してください。");
      return false;
    }
    return true;
  }

  // Comment Update
  const update = async (textarea, id) => {
    if (validation(textarea.value)) {
      await props.update(textarea.value, id);
      setMsg('');
      setUpdateFlg(false);
    }
  }

  return (
      <>
        {
          <div className="comment-item">
            <div className="comment-title d-flex justify-content-between">
              <label>{ props.comment.username }</label>
              <div>
                { props.user && props.user.id === props.comment.owner_id
                  ?
                    updateFlg
                    ? <span>
                        <i className="bi bi-pencil-fill m-1 update-btn" onClick={ () => update(textareaValue.current, props.comment.id) }></i>
                        <i className="bi bi-x-lg m-1 update-cancel-btn" onClick={ () => { setUpdateFlg(false); setMsg(''); } }></i>
                      </span>
                    : <span>
                        <i className="bi bi-pencil m-1 update-btn" onClick={ () => setUpdateFlg(true) }></i>
                        <i className="bi bi-trash m-1 delete-btn" onClick={ () => props.delete(props.comment.id) }></i>
                      </span>
                  : <span></span>
                }
                <span className="comment-date">{ new Date(props.comment.created_at).toISOString().split("T")[0] }</span>
              </div>
            </div>
            {
              updateFlg
              ? <CommentAllow comment={ props.comment.comment } textareaRef={ textareaValue } msg={ msg } setMsg={ setMsg } />
              : <div className="comment-comment" >
                { 
                  props.comment.comment.split("\n").map((data, key) => {
                    return <span key={key}>{data}<br/></span>
                  })
                }
                </div>
            }
          </div>
        }
      </>
  );
}


export default Comments;
