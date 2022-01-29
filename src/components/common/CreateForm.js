import React from 'react';
import { useNavigate } from "react-router-dom";


const CreateForm = ( props)  => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  }

  return (
    <>
      <form onSubmit={ props.onSubmit }>
        <div className="mb-3 row">
          <label htmlFor="title"  className="col-sm-2 col-form-label">Title</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="title" name="title" placeholder="Title" value={ props.data.title } onChange={ props.onChange } maxLength="50" />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="content"  className="col-sm-2 col-form-label">Content</label>
          <div className="col-sm-10">
            <textarea className="form-control" id="content" name="content" rows="15" cols="50" placeholder="Content" maxLength="1000" style={{resize: 'none'}} onChange={ props.onChange } defaultValue={ props.data.content } />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-outline-primary m-1">Submit</button>
          <button type="button" className="btn btn-outline-danger m-1" onClick={ handleClick }>Cancel</button>
        </div>
      </form>
    </>
  );
}

export default CreateForm;
