const { gql } = require("apollo-server");

/* Because this file only exports the typeDefs and
it is named type defs we do not need 
module.exports("typeDefs", typeDefs);
at the bottom.
Instead, just export it in its declartation */

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: Int!
    dislikes: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
    liked: [ID]!
    disliked: [ID]!
  }

  type Query {
    getPosts: [Post]
    getUsers: [User]
    getUser(userId: ID!): User
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post
    deletePost(postId: String!): Post
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: String!, commentId: String!): Post!
    likePost(postId: ID!): Post!
    dislikePost(postId: ID!): Post!
  }
`;
