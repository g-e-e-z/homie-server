import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import { AuthContext } from "../context/auth";

// Material Imports
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grow from "@material-ui/core/Grow";

// Component Imports
import PostCard from "./PostCard";
import "./MainFeed.css";

function MainFeed() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const [selectedTab, setSelectedTab] = useState(0);
  const { user } = useContext(AuthContext);

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
        {user ? (
          loading ? (
            <h1>Loading Posts..</h1>
          ) : (
            data.getPosts &&
            data.getPosts.map((post) => (
              <Grow in={true} timeout={200} key={post.id}>
                <div className="feed-post" key={post.id}>
                  <PostCard post={post} />
                </div>
              </Grow>
            ))
          )
        ) : (
          <h1>Logged Out</h1>
        )}
      </div>
    </div>
  );
}

export default MainFeed;
