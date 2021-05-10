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
    points: Int!
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
  }

  type Query {
    getPosts: [Post]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;
