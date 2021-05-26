import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Button, TextField } from "@material-ui/core";
import { useForm } from "../util/hooks";

function EditFields({ userInfo, field }) {
  if (field === "pfp") {
    var mutation = CHANGE_PICTURE;
    var btnLabel = "Update Profile Picture";
    var fieldValue = userInfo.pfp;
  } else {
    var mutation = CHANGE_BIO;
    var btnLabel = "Update Bio";
    var fieldValue = userInfo.bio;
  }

  const { values, onChange, onSubmit } = useForm(updateField, {
    body: "test",
  });

  const [changeField, { error }] = useMutation(mutation, {
    variables: {
      username: userInfo.username,
      body: values,
    },
  });

  function updateField() {
    console.log(values);
    console.log(typeof userInfo.username);
    console.log(typeof values.body);
    changeField();
  }

  return (
    <>
      <form className="edit-input" onSubmit={onSubmit}>
        <TextField
          id="outlined-multiline-static"
          label="Edit Profile Picture"
          defaultValue={fieldValue}
          variant="outlined"
          fullWidth
          name="body"
          onChange={onChange}
          value={values.body}
          error={error ? true : false}
        />
        <Button type="submit" variant="contained" className="update-btn">
          {btnLabel}
        </Button>
      </form>
    </>
  );
}

export default EditFields;

const CHANGE_BIO = gql`
  mutation changeBio($username: String!, $body: String!) {
    changeBio(username: $username, body: $body) {
      id
    }
  }
`;
const CHANGE_PICTURE = gql`
  mutation changePicture($username: String!, $link: String!) {
    changePicture(username: $username, link: $link) {
      id
    }
  }
`;
