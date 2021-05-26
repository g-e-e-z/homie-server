import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      comments {
        id
        body
        createdAt
        username
        user
      }
      username
      likes {
        username
      }
      dislikes {
        username
      }
      score
      user
    }
  }
`;

export const FETCH_USER_QUERY = gql`
  query ($userId: ID!) {
    getUser(userId: $userId) {
      id
      username
      disliked
      liked
      pfp
      bio
    }
  }
`;
