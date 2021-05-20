import React, { useContext } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import "./UserCardL.css";
import { AuthContext } from "../context/auth";
import { Button, TextField } from "@material-ui/core";
import { useForm } from "../util/hooks";

function UserCardL() {
  const { user, logout } = useContext(AuthContext);
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <div className="user-container">
      <div className="user-card-container">
        <div className="left-div">
          <img
            src="https://semantic-ui.com/images/avatar2/large/matthew.png"
            alt="boop"
            className="avatar"
          ></img>
          {/* <h4>32</h4> */}
        </div>
        <div className="right-div">
          <div className="right-header">
            <h3>{user.username}</h3>
          </div>

          <div className="right-body">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio
              repellat quaerat recusandae est quo ipsum nam. Magnam ut eos odio.
            </p>
          </div>
        </div>
      </div>
      <div className="post-container">
        <form onSubmit={onSubmit}>
          <TextField
            id="outlined-multiline-static"
            label="Make a Post"
            multiline
            rows={4}
            defaultValue="What'chu tryna say?"
            variant="outlined"
            fullWidth
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
            // error={"general" in errors}
            // helperText={error.general}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!values.body}
            className="logout-btn"
          >
            Submit
          </Button>
        </form>
      </div>

      <Button
        type="submit"
        variant="contained"
        className="logout-btn"
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes
      dislikes
      comments {
        id
        createdAt
        username
        body
      }
    }
  }
`;

export default UserCardL;
