<div className="detail-single">
  <div className="container">
    <div className="row align-items-start">
      <div className="col-lg-8 m-15 px-tb">
        {/* コメント COMMENT */}
        <div className="comment">
          { renderComment }
          { renderPagination }
          
          { props.token && user
            ? <Comments comment="" create={ props.commentCreate } textareaRef={ textareaValue } cmd="create"/> 
            : <CommentNotAllow showModal={ showModal } setShowModal={ setShowModal } />
          }
        </div>
      </div>
    </div>
  </div>
</div>
