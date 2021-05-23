import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

function DeleteButton({ postId, userId, commentId }) {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: { postId },
    update(cache, { data: { deletePost } }) {
      const identity = cache.identify(deletePost);
      cache.evict({ id: identity });
    },
  });

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { postId, commentId },
  });

  const mutation = commentId ? deleteComment : deletePost;

  return (
    <Button onClick={mutation} variant="text" size="small" className="delete">
      <DeleteIcon size="small" color="secondary" />
    </Button>
  );
}

export default DeleteButton;

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: String!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: String!, $commentId: String!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
