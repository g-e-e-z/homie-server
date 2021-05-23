import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import gql from "graphql-tag";

import { IconButton } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function DislikeButton({ postId, user }) {
  const [disliked, setDisliked] = useState(false);
  useEffect(() => {
    if (user && user.disliked.find((post) => post === postId)) {
      setDisliked(true);
    } else setDisliked(false);
  }, [user, postId, disliked]);

  const [dislikePost] = useMutation(DISLIKE_POST, {
    variables: { postId },
    refetchQueries: { query: FETCH_POSTS_QUERY },
  });

  const dislikeIcon = disliked ? "primary" : "disabled";

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
