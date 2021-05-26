import React, { useState, useRef } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, TextField } from "@material-ui/core";

function CommentForm({ postId }) {
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState("");

  const [createComment] = useMutation(CREATE_COMM_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  const createCommCallback = (event) => {
    event.preventDefault();
    createComment();
  };

  return (
    <div>
      <form onSubmit={createCommCallback} className="comment-form-container">
        <TextField
          id="outlined-multiline-static"
          label="Make a Comment"
          type="text"
          variant="outlined"
          name="comment"
          placeholder="Comment.."
          className="comm-field"
          onChange={(event) => setComment(event.target.value)}
          value={comment || ""}
          ref={commentInputRef}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={comment.trim() === ""}
          className="comment-btn"
          onClick={createCommCallback}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CommentForm;

const CREATE_COMM_MUTATION = gql`
  mutation createComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
      createdAt
      comments {
        id
        username
      }
      user
    }
  }
`;
