import React from "react";
import "./UserCardS.css";

function UserCardS({ user }) {
  const bio =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio repellat quaerat recusandae est quo ipsum nam. Magnam ut eos odio.";

  return (
    <div className="c-card-container">
      <div className="c-left-div">
        <img
          src="https://semantic-ui.com/images/avatar2/large/matthew.png"
          alt="boop"
          className="c-avatar"
        ></img>
      </div>
      <div className="c-right-div">
        <div className="c-right-header">
          <h3>{user.username}</h3>
        </div>
        <div className="c-right-body">
          <p className="c-bio">{bio}</p>
        </div>
      </div>
    </div>
  );
}

export default UserCardS;
