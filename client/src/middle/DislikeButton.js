import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import gql from "graphql-tag";

import { IconButton } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

function DislikeButton({ postId, user }) {
  const [disliked, setDisiked] = useState(false);
  useEffect(() => {
    if (user && user.disliked.find((post) => post === postId)) {
      setDisiked(true);
    } else setDisiked(false);
  }, [user, postId, disliked]);

  const [dislikePost] = useMutation(DISLIKE_POST, {
    variables: { postId },
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
      likes
      dislikes
    }
  }
`;
