import React, { useState } from "react";
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

  const { values, onChange, onSubmit } = useForm(updateField, {});
  const [errors, setErrors] = useState({});

  const [changeField, { error }] = useMutation(mutation, {
    onError(err) {
      setErrors(err.graphQLErrors[0]);
    },
    variables: {
      username: userInfo.username,
      body: values.body,
    },
    if(error) {
      console.log(error);
    },
  });

  function updateField() {
    changeField();
  }

  console.log(errors);

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
          helperText={errors.message}
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
  mutation changePicture($username: String!, $body: String!) {
    changePicture(username: $username, body: $body) {
      id
    }
  }
`;
