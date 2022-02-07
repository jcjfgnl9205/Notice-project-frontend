import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from '../../lib/Auth';
import DetailPage from '../../components/notice/DetailPage';
import Spinner from '../../components/common/Spinner';
import Comments from '../../components/notice/Comments';
import CommentCreate from '../../components/notice/CommentCreate';
import CommentNotAllow from '../../components/notice/CommentNotAllow';
import Pagination from '../../components/common/Pagination';
import Template1 from '../../components/notice/Template1';
import Template2 from '../../components/notice/Template2';
import Template3 from '../../components/notice/Template3';
import LoginModal from '../../components/common/LoginModal';

const Notice = () => {
  const path = useLocation().pathname;
  const [ data, setData ] = useState(null);
  const [ commentData, setCommentData ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);

  const { user, token } = useContext(UserContext);
  const [ btnStatus, setBtnStatus ] = useState({"like": "", "hate": ""})
  const navigate = useNavigate();

  const [ flg, setFlg ] = useState(false);
  const [ commentTotal, setCommentTotal ] = useState(0);//comment数
  const [ currentPage, setCurrentPage ] = useState(1);//現在ページ
  const [ paginationPage ] = useState(5);//一つのページに表示するcomment数
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  // Get Notice
  useEffect(() => {
    const getNotice = async () => {
      const param = { method: "GET",
                      headers: { "Content-Type": "application/json", },
                    };
      const response = await fetch(`http://127.0.0.1:8000${path}`, param);
      const data = await response.json();
      if (response.status === 200) {
        setData(data);
      } else {
        navigate("/notices");
        return;
      }
    }
    getNotice();
    getLikeCount();
  }, []);

  // Delete Notice
  const noticeDelete = async (notice_id) => {
    const param = { method: "DELETE",
                    headers: { "Content-Type": "application/json;"
                              , "Authorization": "Bearer " + token},
                    body: JSON.stringify({ notice_id: notice_id })
                  };

    const response = await fetch("http://localhost:8000"+path, param);
    if (response.status === 200) {
      navigate("/notices");
    }
  }

  // Get Comment
  useEffect(() => {
    const getComment = async () => {
      const param = { method: "GET",
                      headers: { "Content-Type": "application/json", },
                    };
      const response = await fetch(`http://127.0.0.1:8000${path}/comment?page=${currentPage}&size=${paginationPage}`, param);
      const data = await response.json();
      if (response.status === 200) {
        setCommentData(data.items);
        setCommentTotal(data.total);
      }
    }
    getComment();
    getLikeCount();
    setFlg(false)
  }, [path, navigate, commentTotal, currentPage, paginationPage, flg]);


  // Create Comment
  const commentCreate = async (comment) => {
    const id = path.split("/");
    const param = { method: "POST",
                    headers: { "Content-Type": "application/json;"
                              , "Authorization": "Bearer " + token},
                    body: JSON.stringify({ comment: comment, notice_id: id[id.length - 1] })
                    };

    const response = await fetch("http://localhost:8000"+path+"/comment", param);
    const data = await response.json();
    if (response.status === 200) {
      setCommentData(data.items);
      setCommentTotal(data.total);
      setCurrentPage(1);
      navigate(`${path}?page=1`);
    }
  }

  // Update Comment
  const commentUpdate = async (comment, comment_id) => {
    const id = path.split("/");
    const param = { method: "PUT",
                    headers: { "Content-Type": "application/json;"
                              , "Authorization": "Bearer " + token},
                    body: JSON.stringify({ notice_id: id[id.length - 1], comment_id: comment_id, comment: comment})
                  };
    const response = await fetch("http://localhost:8000"+path+"/comment/"+comment_id, param);
    const data = await response.json();

    if (response.status === 200) {
      setCommentData(data.items);
      setCommentTotal(data.total);
      setFlg(true);
    }
  }

  // Delete Comment
  const commentDelete = async (comment_id) => {
    const id = path.split("/");
    const param = { method: "DELETE",
                    headers: { "Content-Type": "application/json;"
                    , "Authorization": "Bearer " + token},
                    body: JSON.stringify({notice_id: id[id.length - 1], comment_id: comment_id})
                  };
    const response = await fetch("http://localhost:8000"+path+"/comment/"+comment_id, param);
    const data = await response.json();

    if (response.status === 200) {
      setCommentData(data.items);
      setCommentTotal(data.total);
    }
  }

  // like button event
  const likeButtonEvent = async () => {
    const id = path.split("/");
    const param = { method: "POST",
                    headers: { "Content-Type": "application/json;"
                              , "Authorization": "Bearer " + token},
                    body: JSON.stringify({ "notice_id": id[id.length - 1] })
                    };

    const response = await fetch("http://localhost:8000"+path+"/like", param);
    const data = await response.json();
    if (response.status === 200) {
      setData(data)
    }
  }

  // hate button event
  const hateButtonEvent = async () => {
    const id = path.split("/");
    const param = { method: "POST",
                    headers: { "Content-Type": "application/json;"
                              , "Authorization": "Bearer " + token},
                    body: JSON.stringify({ "notice_id": id[id.length - 1] })
                    };

    const response = await fetch("http://localhost:8000"+path+"/hate", param);
    const data = await response.json();
    if (response.status === 200) {
      setData(data)
    }
  }

  // get like, hate count
  const getLikeCount = async () => {
    if (user) {
      const id = path.split("/");
      const param = { method: "POST",
                      headers: { "Content-Type": "application/json;"
                                , "Authorization": "Bearer " + token},
                      body: JSON.stringify({ "notice_id": id[id.length - 1] })
                      };
      const response = await fetch("http://localhost:8000"+path+"/getLike", param);
      const data = await response.json();
      if (response.status === 200 && data !== null) {
        setBtnStatus({ "like": data.like ? "active" : "", "hate": data.hate ? "active" : ""})
      }
    }
  }


  const renderNotice = data === null 
                      ? <Spinner />
                      : <DetailPage data={ data } 
                                    token={ token }
                                    noticeDelete={ noticeDelete }
                                    likeButtonEvent = { likeButtonEvent }
                                    hateButtonEvent = { hateButtonEvent }
                                    btnStatus={ btnStatus }
                                    getLikeCount={ getLikeCount }
                                    setShowModal={ setShowModal }
                                    />;

  const renderComment = commentData && commentData.length
                      ? <Comments user={ user } comments={ commentData } update={ commentUpdate } delete={ commentDelete }/>
                      : <p className="text-center">Invalid Comments</p>

  const renderCommentCreate = token && user
                            ? <CommentCreate comment="" create={ commentCreate } /> 
                            : <CommentNotAllow showModal={ showModal } setShowModal={ setShowModal } />
  
  const renderCommentPaginate = commentData && commentData.length
                              ? <Pagination total={ commentTotal }
                                            paginate={ paginate }
                                            paginationPage={ paginationPage }
                                            currentPage={ currentPage } /> 
                              : <span></span>

  const renderTemplate1 = <Template1 />
  const renderTemplate2 = <Template2 />
  const renderTemplate3 = <Template3 />

  return (
    <>
      <div className="detail-single">
        <div className="container">
          <div className="row align-items-start">
          <div className="col-lg-8 m-15 px-tb">
            { renderNotice }
            <div className="comment">
              { renderComment }
              { renderCommentPaginate }
              { renderCommentCreate }
            </div>
          </div>
            <div className="col-lg-4 m-15px-tb detail-aside">
              { renderTemplate1 }
              { renderTemplate2 }
              { renderTemplate3 }
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

export default Notice;
