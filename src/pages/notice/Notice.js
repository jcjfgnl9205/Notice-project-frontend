import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import DetailPage from '../../components/common/DetailPage';
import Spinner from '../../components/common/Spinner';


const Notice = () => {
  const url = useLocation().pathname;
  const [ data, setData ] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const notice = async() => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await fetch("http://127.0.0.1:8000"+url, requestOptions)
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

  const renderNotice = data === null 
                      ? <Spinner />
                      : <DetailPage data={ data } />;

  return (
    <>
      { renderNotice }
    </>
  );
}

export default Notice;
