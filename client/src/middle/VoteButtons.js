import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";

function VoteButtons({ postInfo, user, score }) {
  const userId = user.id;

  const { loading, data } = useQuery(FETCH_USER_QUERY, {
    variables: { userId },
  });

  if (!loading) {
    var { getUser } = data;
  } else {
    return <p></p>;
  }

  return (
    <div>
      <LikeButton postInfo={postInfo} user={getUser} />
      <h5>{score}</h5>
      <DislikeButton postInfo={postInfo} user={getUser} />
    </div>
  );
}

const FETCH_USER_QUERY = gql`
  query ($userId: ID!) {
    getUser(userId: $userId) {
      id
      username
      disliked
      liked
    }
  }
`;

export default VoteButtons;
