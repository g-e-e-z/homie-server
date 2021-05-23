import React from "react";
import { Button, TextField } from "@material-ui/core";
// import { useForm } from "../util/hooks";

function EditFields() {
  //   const { values, onChange, onSubmit } = useForm(createPostCallback, {
  //     body: "",
  //   });

  return (
    <div className="edit-input">
      <TextField
        id="outlined-multiline-static"
        label="Edit Profile Picture"
        defaultValue="Get Current Link"
        variant="outlined"
        fullWidth
        name="body"
        // onChange={onChange}
        // value={values.body}
        // error={error ? true : false}
      />
      <p></p>
      <TextField
        id="outlined-multiline-static"
        label="Edit Bio"
        defaultValue="Get Current Bio"
        variant="outlined"
        fullWidth
        name="body"
        // onChange={onChange}
        // value={values.body}
        // error={error ? true : false}
      />
      <Button
        type="submit"
        variant="contained"
        className="update-btn"
        onClick={console.log("Update")}
      >
        Update Profile
      </Button>
    </div>
  );
}

export default EditFields;
