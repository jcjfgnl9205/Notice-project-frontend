import React, { useRef, useState, useContext, useEffect } from 'react';
import './DetailPageCss.css';
import CommentAllow from './CommentAllow';
import CommentNotAllow from './CommentNotAllow';
import { UserContext } from '../../lib/Auth';
import LikeButton from '../common/LikeButton';
import HateButton from '../common/HateButton';

const DetailPage = (props) => {
  const [ cmd, setCmd ] = useState(false);
  const { user } = useContext(UserContext);
  const [ btnStatus, setBtnStatus ] = useState({"like": "", "hate": ""})
  const textareaValue = useRef();

  return (
    <>
      <div className="detail-single">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-lg-8 m-15 px-tb">
              <article className="article">
                {/* 本文 Title, username etc.. */}
                <div className="article-title">
                  <div className="d-flex justify-content-between">
                    <h2>{ props.data.title }</h2>
                    { user && props.data.user.username == user.sub
                    ? <span>
                        <i className="bi bi-pencil m-1 update-btn"></i>
                        <i className="bi bi-trash m-1 delete-btn" onClick={ () => props.noticeDelete(props.data.id) }></i>
                      </span>
                    : null
                    }
                  </div>
                  <div className="media">
                    <div className="media-body">
                      <label>{ props.data.user.username }</label>
                      <span>{ props.data.created_at }</span>
                    </div>
                  </div>
                </div>
                {/* 本文 CONTENT */}
                <div className="article-content">
                  { props.data.content }
                </div>

                {/* いいねボタン like, hate buton */}
                <div className="d-flex justify-content-center">
                    <LikeButton data={ props } btnStatus={ btnStatus } setBtnStatus={ setBtnStatus } />
                    <HateButton data={ props } btnStatus={ btnStatus } setBtnStatus={ setBtnStatus } />
                </div>
              </article>

              {/* コメント COMMENT */}
              <div className="comment">
                {
                  props.data.comment?.map(comment => (
                    <div className="comment-item" key={comment.id} >
                      <div className="comment-title d-flex justify-content-between">
                        <label>{ comment.username }</label>
                        <div>
                            { user && comment.username == user.sub
                              ? <span>
                                  {
                                    cmd && cmd == comment.id
                                    ? <span>
                                        <i className="bi bi-pencil-fill m-1 update-btn" onClick={ () => props.commentUpdateOnSubmit(textareaValue.current.value, comment.id, setCmd) }></i>
                                        <i className="bi bi-x-lg m-1 update-cancel-btn" onClick={ () => setCmd(false) }></i>
                                      </span>
                                    : <span>
                                        <i className="bi bi-pencil m-1 update-btn" onClick={ () => setCmd(comment.id) }></i>
                                        <i className="bi bi-trash m-1 delete-btn" onClick={ () => props.commentDelete(comment.id) }></i>
                                      </span>
                                  }
                                </span>
                              : null
                            }
                          <span className="comment-date">{ new Date(comment.created_at).toISOString().split("T")[0] }</span>
                        </div>
                      </div>
                      {
                        cmd && cmd == comment.id
                        ? <CommentAllow cmd="update" comment={ comment } cmd={ cmd } setCmd={ setCmd } textareaRef={textareaValue} />
                        : <div className="comment-comment" >{ comment.comment}</div>
                      }
                    </div>
                  ))
                }
                { props.token
                ? <CommentAllow commentOnSubmit={ props.commentOnSubmit } /> 
                : <CommentNotAllow />
                }
              </div>
            </div>

            <div className="col-lg-4 m-15px-tb detail-aside">
              <div className="widget widget-author">
                <div className="widget-title">
                  <h3>Author</h3>
                </div>
                <div className="widget-body">
                  <div className="media align-items-center">
                    <div className="media-body">
                      <h6>Hello</h6>
                    </div>
                  </div>
                  <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores</p>
                </div>
              </div>

              <div className="widget widget-latest-post">
                <div className="widget-title">
                  <h3>Post</h3>
                </div>
                <div className="widget-body">
                  <div className="latest-post-aside media">
                    <div className="lpa-left media-body">
                      <div className="lpa-title">
                        <h5><a href="#">Prevent 75% of visitors from google analytics</a></h5>
                      </div>
                      <div className="lpa-meta">
                        <a className="name" href="#">Rachel Roth</a>
                        <a className="date" href="#">26 FEB 2020</a>
                      </div>
                    </div>
                  </div>
                  <div className="latest-post-aside media">
                    <div className="lpa-left media-body">
                      <div className="lpa-title">
                        <h5><a href="#">Prevent 75% of visitors from google analytics</a></h5>
                      </div>
                      <div className="lpa-meta">
                        <a className="name" href="#">Rachel Roth</a>
                        <a className="date" href="#">26 FEB 2020</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="widget widget-tags">
                <div className="widget-title">
                  <h3>Tags</h3>
                </div>
                <div className="widget-body">
                  <div className="nav tag-cloud">
                    <a href="#">SAMPLE1</a>
                    <a href="#">SAMPLE2</a>
                    <a href="#">SAMPLE3</a>
                    <a href="#">SAMPLE4</a>
                    <a href="#">SAMPLE5</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailPage;
