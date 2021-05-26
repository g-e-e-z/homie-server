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
import { useQuery } from "@apollo/client";
import { FETCH_USER_QUERY } from "../util/graphql";

function PostCard({
  post: {
    body,
    createdAt,
    id,
    username,
    user: poster,
    likes,
    dislikes,
    comments,
    score,
  },
}) {
  const { user } = useContext(AuthContext);

  const [commPanel, setCommPanel] = useState(false);

  const postInfo = { id, likes, dislikes };

  const toggleComm = useCallback(() => {
    setCommPanel((commPanel) => !commPanel);
  }, []);

  const { loading, data } = useQuery(FETCH_USER_QUERY, {
    variables: { userId: poster },
  });
  if (!loading) {
    var { getUser } = data;
  } else {
    return <p>Loading Post</p>;
  }

  return (
    <>
      <div className="post-card">
        <div className="post-header">
          <div className="post-left">
            <div className="post-votes">
              <VoteButtons postInfo={postInfo} user={user} score={score} />
            </div>
            <img src={getUser.pfp} alt="boop" />
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
