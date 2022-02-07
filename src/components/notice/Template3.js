import React from 'react';
import { Link } from 'react-router-dom';

const Template3 = (props) => {


  return (
      <>
        <div className="widget widget-tags">
          <div className="widget-title">
            <h3>Tags</h3>
          </div>
          <div className="widget-body">
            <div className="nav tag-cloud">
              <Link to="#">SAMPLE1</Link>
              <Link to="#">SAMPLE2</Link>
              <Link to="#">SAMPLE3</Link>
              <Link to="#">SAMPLE4</Link>
              <Link to="#">SAMPLE5</Link>
            </div>
          </div>
        </div>
      </>
  );
}


export default Template3;
