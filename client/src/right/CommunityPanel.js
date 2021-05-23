import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Grow from "@material-ui/core/Grow";
import "./CommunityPanel.css";
import gql from "graphql-tag";

import UserCardS from "./UserCardS";

function CommunityPanel() {
  const { loading, data } = useQuery(FETCH_USERS_QUERY);
  return (
    <div className="community-panel">
      <div className="c-header">
        <h1>Homies</h1>
      </div>
      {loading ? (
        <h1>Loading Users... </h1>
      ) : (
        data.getUsers &&
        data.getUsers.map((user) => (
          <Grow in={true} timeout={200} key={user.id}>
            <div className="feed-user" key={user.id}>
              <UserCardS user={user} />
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
