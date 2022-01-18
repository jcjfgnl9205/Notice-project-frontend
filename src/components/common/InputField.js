import React from 'react';


const InputField = ( props ) => {

  return (
    <div className="mb-3 row">
      <label htmlFor={ props.label } className="col-sm-3 col-form-label">{ props.label }</label>
      <div className="col-sm-9">
        <input
          type={ props.type }
          className="form-control"
          id={ props.label }
          name={ props.name }
          placeholder={ props.placeholder }
          minLength={ props.minLength }
          maxLength={ props.maxLength }
          onChange={ props.onChange }
          value={ props.value } />
      </div>
    </div>
  );
}

export default InputField;
