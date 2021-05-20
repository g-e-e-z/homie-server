import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";

function VoteButtons({ postId, user, votes }) {
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
      <LikeButton postId={postId} user={getUser} />
      <h5>{votes}</h5>
      <DislikeButton postId={postId} user={getUser} />
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
