import React from 'react';
import { Link } from 'react-router-dom';


const Table = ({ columns, data }) => {
  return (
    <>
      <div className="detail-single">
        <div className="container">
          <div className="align-items-start">
            <div className="col-lg-12 m-15 px-tb">
              <article className="article">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      { columns.map( column => (
                        <th scope="col" key={ column }>{ column }</th>
                      )) }
                    </tr>
                  </thead>
                  <tbody>
                    { data.map( data => (
                      <tr key={ data.id }>
                        <td style={{ width: "5%" }}>{ data.id }</td>
                        <td style={{ width: "65%" }}><Link to={{ pathname: String(data.id) }}>{ data.title }</Link></td>
                        <td style={{ width: "10%" }}>{ data.views }</td>
                        <td style={{ width: "20%" }}>{ new Date(data.created_at).toISOString().split("T")[0] }</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
