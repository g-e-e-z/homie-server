import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { IconButton } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

function LikeButton({ postInfo: { id, likes, dislikes }, user }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((vote) => vote.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes, dislikes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
  });

  const likeIcon = liked ? "primary" : "disabled";

  return (
    <div>
      <IconButton className="post-up" onClick={likePost}>
        <KeyboardArrowUpIcon color={likeIcon} />
      </IconButton>
    </div>
  );
}

export default LikeButton;

const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      body
      likes {
        id
        username
      }
      dislikes {
        id
        username
      }
      score
    }
  }
`;
