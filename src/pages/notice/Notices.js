import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/notice/Table';
import Pagination from '../../components/common/Pagination';
import { UserContext } from '../../lib/Auth';


const Notices = () => {

  const [ notices, setNotices ] = useState([]);
  const columns = ["No", "Title", "Views", "Created"]
  const { user } = useContext(UserContext);
  const [ total, setTotal ] = useState(0);//noticeの数
  const [ currentPage, setCurrentPage ] = useState(1);//現在ページ
  const [ paginationPage, setPaginationPage ] = useState(5);//一つのページに表示するnotice数

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    const url = `http://localhost:8000/notices/?page=${currentPage}&size=${paginationPage}`;
    fetch(url)
      .then( response => { return response.json() })
      .then( response => {
        setNotices(response.items);
        setTotal(response.total);
        
    });
  }, [currentPage]);

  const renderNotices = notices.length 
                        ? <Table columns={ columns } data={ notices } /> 
                        : 'null';

  const renderPagination = notices.length
                        ? <Pagination total={ total }
                                      paginate={ paginate }
                                      paginationPage={ paginationPage }
                                      currentPage={ currentPage } /> 
                        : 'null';

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2>Notice</h2>
        { user 
          ? <Link className="btn btn-outline-primary btn-sm m-2" to={{ pathname: "create" }}>create</Link>
          : null
        }
      </div>
      { renderNotices }
      { renderPagination }
    </>
  );
}

export default Notices;
