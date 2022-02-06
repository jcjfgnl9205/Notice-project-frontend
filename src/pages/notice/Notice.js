import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import DetailPage from '../../components/notice/DetailPage';
import Spinner from '../../components/common/Spinner';
import { UserContext } from '../../lib/Auth';

const Notice = () => {
  const path = useLocation().pathname;
  const [ data, setData ] = useState(null);
  const [ commentData, setCommentData ] = useState(null);
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
  }, [path, navigate]);

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
    console.log("get comment")
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
      if (response.status === 200) {
        setBtnStatus({ "like": data.like ? "active" : "", "hate": data.hate ? "active" : ""})
      }
    }
  }


  const renderNotice = data === null 
                      ? <Spinner />
                      : <DetailPage data={ data } 
                                    commentData = { commentData }
                                    token={ token }
                                    noticeDelete={ noticeDelete }
                                    likeButtonEvent = { likeButtonEvent }
                                    hateButtonEvent = { hateButtonEvent }
                                    commentCreate = { commentCreate }
                                    commentUpdate = { commentUpdate }
                                    commentDelete={ commentDelete }
                                    btnStatus={ btnStatus }
                                    setBtnStatus={ setBtnStatus }
                                    getLikeCount={ getLikeCount }

                                    commentTotal={ commentTotal }
                                    paginate={ paginate }
                                    paginationPage={ paginationPage }
                                    currentPage={ currentPage }
                                    />;

  return (
    <>
      { renderNotice }
    </>
  );
}

export default Notice;
