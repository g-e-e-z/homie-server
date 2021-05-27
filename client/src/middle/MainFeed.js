import React, { useContext, useEffect, useState } from "react";
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
  const [selectedTab, setSelectedTab] = useState(0);
  const { user } = useContext(AuthContext);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  if (!loading) {
    var newData = [...data.getPosts]; // Recent
    if (selectedTab === 1) {
      newData = newData.sort((a, b) => a.score < b.score);
    } else if (selectedTab === 2) {
      newData = newData.sort((a, b) => a.comments < b.comments);
    }
  }

  useEffect(() => {
    if (!loading && !!data) {
      setSelectedTab(selectedTab);
    }
  }, [data, loading, selectedTab]);

  return (
    <div className="main-feed">
      <div className="feed-header">
        <Tabs value={selectedTab} onChange={handleChange} centered>
          <Tab label="Recent" />
          <Tab label="Top" />
          <Tab label="Popular" />
        </Tabs>
      </div>
      <div className="feed-body">
        {user ? (
          loading || !newData ? (
            <h1>Loading Posts..</h1>
          ) : (
            newData &&
            newData.map((post) => (
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
