import React from 'react';
import { Link } from 'react-router-dom';


const Table = ({ columns, data }) => {
  return (
    <>
    <table className="table table-hover">
      <thead className="table-active">
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
    </>
  );
}

export default Table;
