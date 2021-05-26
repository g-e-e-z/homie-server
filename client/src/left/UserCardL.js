import React, { useContext } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY, FETCH_USER_QUERY } from "../util/graphql";
import "./UserCardL.css";
import { AuthContext } from "../context/auth";
import { Button, TextField } from "@material-ui/core";
import { useForm } from "../util/hooks";

import EditButton from "./EditButton.js";

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

  // TODO If token has expired call logout onSubmit instead of attempting to submit
  function createPostCallback() {
    createPost();
  }

  const { loading, data } = useQuery(FETCH_USER_QUERY, {
    variables: { userId: user.id },
  });
  if (!loading) {
    var { getUser } = data;
  } else {
    return <p>Loading User</p>;
  }

  return (
    <div className="user-container">
      <div className="user-card-container">
        <div className="left-div">
          <img
            src={
              getUser.pfp ||
              "https://semantic-ui.com/images/avatar2/large/matthew.png"
            }
            alt="boop"
            className="avatar"
          ></img>
        </div>
        <div className="right-div">
          <div className="right-header">
            <h3>{user.username}</h3>
          </div>

          <div className="right-body">
            <p>{getUser.bio || "Wow Alex, super cool website!"}</p>
          </div>
        </div>
      </div>
      <div className="post-container">
        <EditButton userInfo={getUser} />
        <form onSubmit={onSubmit}>
          <TextField
            id="outlined-multiline-static"
            label="Make a Post"
            type="text"
            // multiline
            rows={4}
            variant="outlined"
            placeholder="Post.."
            fullWidth
            name="body"
            className="post-field"
            onChange={onChange}
            value={values.body || ""}
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

        <Button
          type="submit"
          variant="contained"
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
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
      likes {
        username
      }
      dislikes {
        username
      }
      score
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
