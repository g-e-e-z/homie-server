import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
// Material Imports
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// Component Imports
import PostCard from "./PostCard";
import "./MainFeed.css";

function MainFeed() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="main-feed">
      <div className="feed-header">
        <Tabs value={selectedTab} onChange={handleChange} centered>
          <Tab label="Recent" />
          <Tab label="Hot" />
          <Tab label="Top" />
        </Tabs>
      </div>
      <div className="feed-body">
        {loading ? (
          <h1>Loading Posts..</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
            <div className="feed-post" key={post.id}>
              <PostCard post={post} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likes
      dislikes
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default MainFeed;
