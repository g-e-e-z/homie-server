import React, { useContext, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";
import "./LoginCard.css";

function Login() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
    },

    onError(err) {
      console.log(errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="register-container">
      <h1>Login</h1>
      <form className="register-card">
        <TextField
          fullWidth
          label="Username"
          placeholder="Enter your username"
          name="username"
          value={values.username}
          onChange={onChange}
          error={"general" in errors}
          helperText={errors.general}
        />

        <TextField
          fullWidth
          label="Password"
          placeholder="Enter your password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
          error={"general" in errors}
          helperText={errors.general}
        />
        <div className="submit-container">
          <Button
            type="submit"
            variant="contained"
            className="submit-btn"
            onClick={onSubmit}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
