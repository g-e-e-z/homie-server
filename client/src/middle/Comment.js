import React from "react";
import moment from "moment";
import DeleteButton from "../middle/DeleteButton";
import "./Comment.css";

function Comment({ user, comment, postId }) {
  return (
    <div className="comment-card">
      <div className="comment-container">
        <div className="comment-avatar-container">
          <img
            src="https://semantic-ui.com/images/avatar2/large/matthew.png"
            alt="boop"
            className="comment-avatar"
          ></img>
        </div>
        <div className="comment-right-div">
          <div className="comment-right-header">
            <h3>{comment.username}</h3>
            <div className="post-time">
              {moment(comment.createdAt).fromNow(true)}
            </div>
          </div>
          <div className="comment-right-body">
            <p className="comment-body">{comment.body}</p>
          </div>
          {user && user.username === comment.username && (
            <DeleteButton
              postId={postId}
              userId={user.id}
              commentId={comment.id}
              className="dlt-btn"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
