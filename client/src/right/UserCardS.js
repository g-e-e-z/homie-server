import React from "react";
import { useQuery } from "@apollo/client";
import { FETCH_USER_QUERY } from "../util/graphql";
import "./UserCardS.css";

function UserCardS({ user }) {
  const { loading, data } = useQuery(FETCH_USER_QUERY, {
    variables: { userId: user.id },
  });
  if (!loading) {
    var { getUser } = data;
  } else {
    return <p>Loading User</p>;
  }
  return (
    <div className="c-card-container">
      <div className="c-left-div">
        <img
          src={
            getUser.pfp ||
            "https://semantic-ui.com/images/avatar2/large/matthew.png"
          }
          alt="boop"
          className="c-avatar"
        ></img>
      </div>
      <div className="c-right-div">
        <div className="c-right-header">
          <h3>{user.username}</h3>
        </div>
        <div className="c-right-body">
          <p className="c-bio">{getUser.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default UserCardS;
