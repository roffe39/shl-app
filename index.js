const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("./graphqlSchema");
const resolvers = require("./resolver");

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();

server.applyMiddleware({ app });

const port = process.env.port || 4000;

app.listen({ port }, () => {
  console.log(
    `Server is running on http://localhost:${port}${server.graphqlPath}`
  );
});