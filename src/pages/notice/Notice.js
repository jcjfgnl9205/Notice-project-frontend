import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import DetailPage from '../../components/common/DetailPage';
import Spinner from '../../components/common/Spinner';
import { UserContext } from '../../lib/Auth';

const Notice = () => {
  const path = useLocation().pathname;
  const [ data, setData ] = useState(null);
  const [ token, setToken ] = useContext(UserContext);
  const navigate = useNavigate();

  // Get Notice
  useEffect(() => {
    const notice = async() => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await fetch("http://127.0.0.1:8000"+path, requestOptions)
        .then(response => response.json())
        .then(response => {
          if (response.detail) {
            navigate("/notices");
            return;
          }
          setData(response);
        })
    };
    notice();
  }, []);

  // Create Comment
  const commentOnSubmit = comment => {
    const id = path.split("/");

    const data = { comment: comment, notice_id: id[id.length - 1] };

    const param = { method: "POST",
                    headers: { "Content-Type": "application/json;"
                              , "Authorization": "Bearer " + token},
                    body: JSON.stringify(data)
                  };

    const url = "http://localhost:8000"+path+"/comment";
    const fetchComment = async () => {
      const response = await fetch(url, param);
      const data = await response.json();
      return data;
    }
    
    fetchComment().then( response => {
      setData(response);
    }).catch( e => {
      console.log(e);
      return;
    });
  }

  // Delete Comment
  const commentDelete = comment_id => {
    const id = path.split("/");
    const data = { notice_id: id[id.length - 1], comment_id: comment_id };
    const param = { method: "DELETE",
                    headers: { "Content-Type": "application/json;"
                              , "Authorization": "Bearer " + token},
                    body: JSON.stringify(data)
    };
    const url = "http://localhost:8000"+path+"/comment/"+comment_id;
    const fetchComment = async () => {
      const response = await fetch(url, param);
      const data = await response.json();
      return data;
    }

    fetchComment().then( response => {
      setData(response);
    }).catch( e => {
      console.log(e);
      return;
    });
  }

  const renderNotice = data === null 
                      ? <Spinner />
                      : <DetailPage data={ data } 
                                    token={ token }
                                    commentOnSubmit={ commentOnSubmit }
                                    commentDelete={ commentDelete }
                                    />;

  return (
    <>
      { renderNotice }
    </>
  );
}

export default Notice;
