import React, { useContext } from 'react';
import './DetailPageCss.css';
import { UserContext } from '../../lib/Auth';
import LikeButton from '../common/LikeButton';
import HateButton from '../common/HateButton';


const DetailPage = (props) => {
  const { user } = useContext(UserContext);

  return (
    <>
      <article className="article">
        {/* 本文 Title, username etc.. */}
        <div className="article-title">
          <div className="d-flex justify-content-between">
            <h2>{ props.data.title }</h2>
            { user && props.data.user.username === user.sub
            ? <span>
                <i className="bi bi-pencil m-1 update-btn"></i>
                <i className="bi bi-trash m-1 delete-btn" onClick={ () => props.noticeDelete(props.data.id) }></i>
              </span>
            : null
            }
          </div>
          <div className="media">
            <div className="media-body">
              <label>{ props.data.user.username }</label>
              <span>{ props.data.created_at }</span>
            </div>
          </div>
        </div>
        {/* 本文 CONTENT */}
        <div className="article-content">
          {
            props.data.content.split("\n").map((data, key) => {
              return <span key={ key }>{data}<br/></span>
            })
          }
        </div>

        {/* いいねボタン like, hate buton */}
        <div className="d-flex justify-content-center">
            <LikeButton data={ props } />
            <HateButton data={ props } />
        </div>
        
        <div>
          {
            props.data.file?.map( data => {
              return <div key={ data.id }>
                      <span className="link_btn" onClick={ () => props.fileDownload(data.id, data.file_name) }>
                        { data.file_name }
                      </span>
                    </div>
            })
          }
        </div>
      </article>
    </>
  );
}

export default DetailPage;
