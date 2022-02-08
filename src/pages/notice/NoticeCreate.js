import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../lib/Auth";
import Alert from "../../components/common/Alert";
import CreateForm from '../../components/notice/CreateForm';
import Spinner from '../../components/common/Spinner'


const noticeCreate = {
  title: "",
  content: "",
  files: "",
}

const NoticeCreate = () => {
    const [ notice, setNotice ] = useState(noticeCreate);
    const { title, content, files } = notice;
    const [ msg, setMsg ] = useState('');
    const { token, user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        navigate(-1);
      }
    });

    const onChange = e => {
      const files = e.target.files;
      const { value, name } = e.target;
      setNotice({
        ...notice, //Inputをコビーする
        [name]: name === "files" ? files : value
      });
    };

    const validateForm = () => {
      if (!title) {
        setMsg('titleを入力してください。');
        return false;
      }
      if (!content) {
        setMsg('contentを入力してください。');
        return false;
      }
      return true;
    }

    const onSubmit = e => {
      e.preventDefault();
      if (validateForm()) {
        let formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("files", new File([""], ""))
        for (let i = 0; i < files.length; i++) {
          console.log("test")
          formData.append("files", files[i])
        }
        const param = { method: "POST",
                        headers: {"Authorization": "Bearer " + token},
                        body: formData
        };

        const url = "http://localhost:8000/notices/";
        const fetchNotice = async () => {
          const response = await fetch(url, param);
          const data = await response.json();
          return data;
        }

        fetchNotice().then( notice => {
          navigate("/notices");
        }).catch( e => {
          console.log(e);
          return;
        });
      }
    }
    const renderNoticeCreate = !user 
                                ? <Spinner />
                                : <CreateForm onSubmit={ onSubmit } onChange={ onChange } data={ notice }/>;

    const errorMsg = msg ? <Alert msg={msg} className="alert alert-warning"/> : null;

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2>Notice Create</h2>
      </div>
      { renderNoticeCreate }
      { errorMsg }
    </>
  );
}

export default NoticeCreate;
