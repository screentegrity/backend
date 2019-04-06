const fs = require("fs");
const http = require("http");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { resolvers } = require("./resolvers");

const typeDefs = gql(
  fs.readFileSync(__dirname.concat("/schema/schema.graphql"), "utf8")
);
const PORT = process.env.PORT || 3000;
const app = express();

const apolloServer = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return {};
    } else {
      // check from req
      const token = req.headers.authorization || "";

      return { token };
    }
  },
});

apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

// ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${
      apolloServer.subscriptionsPath
    }`
  );
});