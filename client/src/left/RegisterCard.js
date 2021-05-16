import React, { useContext, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth";

import { useForm } from "../util/hooks";
import "./RegisterCard.css";

function RegisterCard() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form className="register-card">
        <TextField
          fullWidth
          label="Username"
          placeholder="Enter your username"
          name="username"
          value={values.username}
          onChange={onChange}
          error={"username" in errors}
          helperText={errors.username}
        />
        <TextField
          fullWidth
          label="Email"
          placeholder="Enter your email"
          name="email"
          value={values.email}
          onChange={onChange}
          error={"email" in errors}
          helperText={errors.email}
        />

        <TextField
          fullWidth
          label="Password"
          placeholder="Enter your password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
          error={"password" in errors}
          helperText={errors.password}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          placeholder="Confirm your password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
          error={"confirmPassword" in errors}
          helperText={errors.confirmPassword}
        />
        <div className="submit-container">
          <Button
            type="submit"
            variant="contained"
            className="submit-btn"
            onClick={onSubmit}
          >
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default RegisterCard;
