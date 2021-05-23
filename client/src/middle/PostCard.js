import React, { useCallback, useContext, useState } from "react";
import "./PostCard.css";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import { Button } from "@material-ui/core";
import moment from "moment";
import Grow from "@material-ui/core/Grow";

import VoteButtons from "./VoteButtons";
import DeleteButton from "./DeleteButton";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

import { AuthContext } from "../context/auth";

function PostCard({
  post: { body, createdAt, id, username, likes, dislikes, comments },
}) {
  const { user } = useContext(AuthContext);

  const votes = likes - dislikes;

  const [commPanel, setCommPanel] = useState(false);

  const toggleComm = useCallback(() => {
    setCommPanel((commPanel) => !commPanel);
  }, []);

  return (
    <>
      <div className="post-card">
        <div className="post-header">
          <div className="post-left">
            <div className="post-votes">
              <VoteButtons postId={id} user={user} votes={votes} />
            </div>
            <img
              src="https://semantic-ui.com/images/avatar2/large/matthew.png"
              alt="boop"
            />
          </div>
          <div className="post-right">
            <div className="post-details">
              <div className="post-title">{username}</div>
              <div className="post-time">{moment(createdAt).fromNow(true)}</div>
            </div>
            <div className="post-body">{body}</div>
            <div className="post-footer">
              {user && user.username === username && (
                <DeleteButton
                  postId={id}
                  userId={user.id}
                  className="dlt-btn"
                />
              )}
              <Button
                onClick={toggleComm}
                size="small"
                variant={commPanel ? "contained" : "text"}
                endIcon={<MoreHorizOutlinedIcon className="comments" />}
              >
                {comments.length}
              </Button>
            </div>
          </div>
        </div>
        <div className="post-meta">{id}</div>
      </div>
      {!commPanel ? (
        ""
      ) : (
        <Grow in={true} timeout={200}>
          <div className="comment-post">
            <CommentForm postId={id} />
          </div>
        </Grow>
      )}
      {!commPanel
        ? ""
        : comments &&
          comments.map((comment) => (
            <Grow in={true} timeout={200} key={comment.id}>
              <div className="comment-post" key={comment.id}>
                <Comment user={user} postId={id} comment={comment} />
              </div>
            </Grow>
          ))}
    </>
  );
}

export default PostCard;
