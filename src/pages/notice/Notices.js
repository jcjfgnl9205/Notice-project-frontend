import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/common/Table';


const Notices = () => {

  const [ notices, setNotices ] = useState([]);
  const columns = ["No", "Title", "Views", "Created"]
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    fetch("http://localhost:8000/notices")
      .then( response => { return response.json() })
      .then( response => {
        setNotices(response);
    });
  }, []);

  const renderNotices = notices.length 
                        ? <Table columns={ columns } data={ notices } /> 
                        : 'error';

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2>Notice</h2>
        { user.is_staff 
          ? <Link className="btn btn-outline-primary btn-sm m-2" to={{ pathname: "create" }}>create</Link>
          : null
        }
      </div>
      { renderNotices }
    </>
  );
}

export default Notices;
