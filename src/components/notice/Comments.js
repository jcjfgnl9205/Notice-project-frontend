import React, { useRef, useState } from 'react';
import CommentAllow from './CommentAllow';

const Comments = (props) => {
  const [ updateFlg, setUpdateFlg ] = useState(false);
  const [ id, setId ] = useState(null);
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
        { props.comments.map((data, key) => {
          return (
                <div className="comment-item" key={key}>
                  <div className="comment-title d-flex justify-content-between">
                    <label>{ data.username }</label>
                    <div>
                      { props.user && props.user.id === data.owner_id
                        ?
                          updateFlg && data.id === id
                          ? <span>
                              <i className="bi bi-pencil-fill m-1 update-btn" onClick={ () => update(textareaValue.current, data.id) }></i>
                              <i className="bi bi-x-lg m-1 update-cancel-btn" onClick={ () => { setUpdateFlg(false); setMsg(''); } }></i>
                            </span>
                          : <span>
                              <i className="bi bi-pencil m-1 update-btn" onClick={ () => { setUpdateFlg(true); setId(data.id); } }></i>
                              <i className="bi bi-trash m-1 delete-btn" onClick={ () => props.delete(data.id) }></i>
                            </span>
                        : <span></span>
                      }
                      <span className="comment-date">{ new Date(data.created_at).toISOString().split("T")[0] }</span>
                    </div>
                  </div>
                  {
                    updateFlg && data.id === id
                    ? <CommentAllow comment={ data.comment } textareaRef={ textareaValue } msg={ msg } setMsg={ setMsg } />
                    : <div className="comment-comment" >
                      { 
                        data.comment.split("\n").map((data, key) => {
                          return <span key={key}>{data}<br/></span>
                        })
                      }
                      </div>
                  }
                </div>
          )
        })
        }
      </>
  );
}


export default Comments;
