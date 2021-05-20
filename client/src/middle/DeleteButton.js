import React from "react";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

function DeleteButton({ postId, userId }) {
  return (
    <Button
      onClick={() => console.log(`Delete Post ${postId}`)}
      variant="text"
      size="small"
      className="delete"
    >
      <DeleteIcon size="small" color="secondary" />
    </Button>
  );
}

export default DeleteButton;
