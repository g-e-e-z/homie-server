const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");
const { MONGODB } = require("./config.js");

// https://www.apollographql.com/docs/apollo-server/api/apollo-server/#class-apolloserver
// next 3 lines are the server instance
const server = new ApolloServer({
  typeDefs, // Would need to put typeDefs: typeDefs, but javascript ES6 infers
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
