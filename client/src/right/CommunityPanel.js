import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Grow from "@material-ui/core/Grow";
import "./CommunityPanel.css";
import gql from "graphql-tag";

function CommunityPanel() {
  const { loading, data } = useQuery(FETCH_USERS_QUERY);
  return (
    <div className="community-panel">
      <h1>Community Panel</h1>
      {loading ? (
        <h1>Loading Users... </h1>
      ) : (
        data.getUsers &&
        data.getUsers.map((user) => (
          <Grow in={true} timeout={200} key={user.id}>
            <div className="feed-user" key={user.id}>
              <p>{user.username}</p>
            </div>
          </Grow>
        ))
      )}
    </div>
  );
}

export default CommunityPanel;

export const FETCH_USERS_QUERY = gql`
  {
    getUsers {
      id
      username
    }
  }
`;
