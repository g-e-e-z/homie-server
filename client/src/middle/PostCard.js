import React, { useContext } from "react";
import "./PostCard.css";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import { Button } from "@material-ui/core";
import moment from "moment";

import VoteButtons from "./VoteButtons";
import DeleteButton from "./DeleteButton";

import { AuthContext } from "../context/auth";

function PostCard({
  post: { body, createdAt, id, username, likes, dislikes, comments },
}) {
  const { user } = useContext(AuthContext);

  const votes = likes - dislikes;

  function commentOnPost() {
    console.log(`Commenting on Post ${id}`);
    console.log(comments.length);
  }

  return (
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
              <DeleteButton postId={id} userId={user.id} />
            )}
            <Button
              onClick={commentOnPost}
              variant="text"
              size="small"
              endIcon={<MoreHorizOutlinedIcon className="comments" />}
            >
              {comments.length}
            </Button>
          </div>
        </div>
      </div>
      <div className="post-meta">{id}</div>
    </div>
  );
}

export default PostCard;
