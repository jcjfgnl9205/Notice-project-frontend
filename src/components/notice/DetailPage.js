import React, { useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './DetailPageCss.css';
import LoginModal from '../common/LoginModal';
import { UserContext } from '../../lib/Auth';
import LikeButton from '../common/LikeButton';
import HateButton from '../common/HateButton';
import CommentNotAllow from './CommentNotAllow';
import Comments from './Comments';
import Pagination from '../common/Pagination';

const DetailPage = (props) => {
  const [ showModal, setShowModal ] = useState(false);
  const { user } = useContext(UserContext);
  const textareaValue = useRef();
  const renderComment = props.commentData && props.commentData.length
                        ? props.commentData.map((comment, key) => {
                          return <Comments user={ user } comment={ comment } update={ props.commentUpdate } delete={ props.commentDelete } msg={ props.msg } setMsg={ props.setMsg } key={ key } />
                        })
                        : <p className="text-center">Invalid Comments</p>
  
  const renderPagination = props.commentData && props.commentData.length
                        ? <Pagination total={ props.commentTotal }
                                      paginate={ props.paginate }
                                      paginationPage={ props.paginationPage }
                                      currentPage={ props.currentPage } /> 
                        : <span></span>;
  // useEffect(() => {
  //   props.getLikeCount();
  // }, []);
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
                    { user && props.data.user.username === user.sub
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
                  {
                    props.data.content.split("\n").map((data, key) => {
                      return <span key={key}>{data}<br/></span>
                    })
                  }
                </div>

                {/* いいねボタン like, hate buton */}
                <div className="d-flex justify-content-center">
                    <LikeButton data={ props } user={ user } showModal={ showModal } setShowModal={ setShowModal } />
                    <HateButton data={ props } user={ user } showModal={ showModal } setShowModal={ setShowModal } />
                </div>
              </article>

              {/* コメント COMMENT */}
              <div className="comment">
                { renderComment }
                { renderPagination }
                
                { props.token && user
                  ? <Comments comment="" create={ props.commentCreate } textareaRef={ textareaValue } cmd="create"/> 
                  : <CommentNotAllow showModal={ showModal } setShowModal={ setShowModal } />
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
                        <h5><Link to="#">Prevent 75% of visitors from google analytics</Link></h5>
                      </div>
                      <div className="lpa-meta">
                        <Link className="name" to="#">Rachel Roth</Link>
                        <Link className="date" to="#">26 FEB 2020</Link>
                      </div>
                    </div>
                  </div>
                  <div className="latest-post-aside media">
                    <div className="lpa-left media-body">
                      <div className="lpa-title">
                        <h5><Link to="#">Prevent 75% of visitors from google analytics</Link></h5>
                      </div>
                      <div className="lpa-meta">
                        <Link className="name" to="#">Rachel Roth</Link>
                        <Link className="date" to="#">26 FEB 2020</Link>
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
                    <Link to="#">SAMPLE1</Link>
                    <Link to="#">SAMPLE2</Link>
                    <Link to="#">SAMPLE3</Link>
                    <Link to="#">SAMPLE4</Link>
                    <Link to="#">SAMPLE5</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginModal
        showModal={ showModal }
        setShowModal={ setShowModal }
        msg="Login"
      />
    </>
  );
}

export default DetailPage;
