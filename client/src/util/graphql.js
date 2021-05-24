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
      }
      username
      likes {
        username
      }
      dislikes {
        username
      }
      score
    }
  }
`;
