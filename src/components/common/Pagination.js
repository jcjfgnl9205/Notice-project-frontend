import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';


const Pagination = ({ noticeTotal, paginate, paginationPage, currentPage }) => {
  
  let [searchParams, setSearchParams] = useSearchParams();

  const page = [];
  for (let i = 1; i <= Math.ceil(noticeTotal / paginationPage); i++){
    page.push(i);
  }

  const pageGroup = [];
  for (let i = 1; i <= Math.ceil(noticeTotal / paginationPage / 10); i++) {
    const p = (i - 1) * 10;
    pageGroup.push(page.slice(p, p + 10))
  }

  const pageGroupNo = parseInt((currentPage - 1) / 10);

  return (
    <>
      {/* Paging */}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {
            pageGroup[pageGroupNo-1]
            ? <li className="page-item">
                <Link className="page-link" to={ `?page=${pageGroup[pageGroupNo-1][pageGroup[pageGroupNo-1].length - 1]}` } onClick={() => paginate(pageGroup[pageGroupNo-1][pageGroup[pageGroupNo-1].length - 1])}>&lt;</Link>
              </li>
            : null
          }


          { pageGroup[pageGroupNo]?.map(number => (
            <li className={ searchParams.get("page")==number ? "page-item active" : "page-item" } key={ number }>
              <Link className="page-link" to={ `?page=${number}`} onClick={() => paginate(number)}>{ number }</Link>
            </li>
          ))
          
          }
          {
            pageGroup[pageGroupNo+1]
            ? <li className="page-item">
                <Link className="page-link" to={ `?page=${pageGroup[pageGroupNo+1][0]}` } onClick={() => paginate(pageGroup[pageGroupNo+1][0])}>&gt;</Link>
              </li>
            : null
          }
        </ul>
      </nav>
    </>
  );
}

export default Pagination;
