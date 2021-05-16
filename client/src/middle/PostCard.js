import React from "react";
import "./PostCard.css";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import moment from "moment";
import { IconButton } from "@material-ui/core";

function PostCard({
  post: { body, createdAt, id, username, likes, dislikes },
}) {
  const votes = likes + dislikes;

  function likePost() {
    console.log(`Liked Post ${id}`);
  }
  function dislikePost() {
    console.log(`Disiked Post ${id}`);
  }
  function commentOnPost() {
    console.log(`Commenting on Post ${id}`);
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-left">
          <div className="post-votes">
            <IconButton className="post-up" onClick={likePost}>
              <KeyboardArrowUpIcon />
            </IconButton>
            <h5>{votes}</h5>
            <IconButton className="post-dn" onClick={dislikePost}>
              <KeyboardArrowDownIcon />
            </IconButton>
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
          <div className="post-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Doloremque, minus cupiditate. Aperiam, vel, voluptatibus nulla
            nesciunt magnam laboriosam similique, itaque repellendus excepturi
            perferendis aliquam illo ex enim suscipit blanditiis qui!{body}
          </div>
          <div className="post-footer">
            <IconButton onClick={commentOnPost}>
              <MoreHorizOutlinedIcon className="comments" />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="post-meta">{id}</div>
    </div>
  );
}

export default PostCard;
