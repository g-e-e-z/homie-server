import React, { useContext } from "react";
import "./UserCardL.css";
import { AuthContext } from "../context/auth";

import { Avatar, Button } from "@material-ui/core";

function UserCardL() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="user-container">
      <div className="user-card-container">
        <div className="left-div">
          <Avatar
            src="https://pbs.twimg.com/profile_images/1310756283050590213/DM4nsjF9_400x400.jpg"
            className="avatar"
          ></Avatar>
          <h4>32</h4>
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

export default UserCardL;
