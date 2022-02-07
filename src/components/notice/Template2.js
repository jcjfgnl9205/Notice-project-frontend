import React from 'react';
import { Link } from 'react-router-dom';

const Template2 = (props) => {


  return (
      <>
        <div className="widget widget-latest-post">
          <div className="widget-title">
            <h3>Post</h3>
          </div>
          <div className="widget-body">
            <div className="latest-post-aside media">
              <div className="lpa-left media-body">
                <div className="lpa-title">
                  <h5><Link to="#">Prevent 75% of visitors from google analytics</Link></h5>
                </div>
                <div className="lpa-meta">
                  <Link className="name" to="#">Rachel Roth</Link>
                  <Link className="date" to="#">26 FEB 2020</Link>
                </div>
              </div>
            </div>
            <div className="latest-post-aside media">
              <div className="lpa-left media-body">
                <div className="lpa-title">
                  <h5><Link to="#">Prevent 75% of visitors from google analytics</Link></h5>
                </div>
                <div className="lpa-meta">
                  <Link className="name" to="#">Rachel Roth</Link>
                  <Link className="date" to="#">26 FEB 2020</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}


export default Template2;
