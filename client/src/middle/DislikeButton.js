import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { IconButton } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

function DislikeButton({ postInfo: { id, likes, dislikes }, user }) {
  const [disliked, setDisliked] = useState(false);
  useEffect(() => {
    if (user && dislikes.find((vote) => vote.username === user.username)) {
      setDisliked(true);
    } else setDisliked(false);
  }, [user, likes, dislikes]);

  const [dislikePost] = useMutation(DISLIKE_POST, {
    variables: { postId: id },
  });

  const dislikeIcon = disliked ? "secondary" : "disabled";

  return (
    <div>
      <IconButton className="post-dn" onClick={dislikePost}>
        <KeyboardArrowDownIcon color={dislikeIcon} />
      </IconButton>
    </div>
  );
}

export default DislikeButton;

const DISLIKE_POST = gql`
  mutation DisikePost($postId: ID!) {
    dislikePost(postId: $postId) {
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
