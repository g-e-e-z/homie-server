const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");
const { MONGODB } = require("./config.js");

const PORT = process.env.PORT || 5000;

// https://www.apollographql.com/docs/apollo-server/api/apollo-server/#class-apolloserver
// next 3 lines are the server instance
const server = new ApolloServer({
  typeDefs, // Would need to put typeDefs: typeDefs, but javascript ES6 infers
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
