import { ApolloServer } from "apollo-server-express";
import express from "express";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import path from "path";
import jwt from "jsonwebtoken";
import channexRoutes from "./channex/routes";

const typeDefs = mergeTypes([
  ...fileLoader(path.join(__dirname, "./types")),
  ...fileLoader(path.join(__dirname, "./channex/availability/graphql/schema.graphql")),
  ...fileLoader(path.join(__dirname, "./channex/room-types/graphql/schema.graphql")),
  ...fileLoader(path.join(__dirname, "./channex/rate-plans/graphql/schema.graphql")),
  ...fileLoader(path.join(__dirname, "./channex/bookings/graphql/schema.graphql")),
  ...fileLoader(path.join(__dirname, "./channex/booking-revisions/graphql/schema.graphql")),
  ...fileLoader(path.join(__dirname, "./channex/groups/graphql/schema.graphql")),
  ...fileLoader(path.join(__dirname, "./channex/properties/graphql/schema.graphql")),
  ...fileLoader(path.join(__dirname, "./channex/restrictions/graphql/schema.graphql")),
]);

const resolvers = mergeResolvers([
  ...fileLoader(path.join(__dirname, "./resolvers")),
  ...fileLoader(path.join(__dirname, "./channex/availability/graphql/resolvers.js")),
  ...fileLoader(path.join(__dirname, "./channex/room-types/graphql/resolvers.js")),
  ...fileLoader(path.join(__dirname, "./channex/rate-plans/graphql/resolvers.js")),
  ...fileLoader(path.join(__dirname, "./channex/bookings/graphql/resolvers.js")),
  ...fileLoader(path.join(__dirname, "./channex/booking-revisions/graphql/resolvers.js")),
  ...fileLoader(path.join(__dirname, "./channex/groups/graphql/resolvers.js")),
  ...fileLoader(path.join(__dirname, "./channex/properties/graphql/resolvers.js")),
  ...fileLoader(path.join(__dirname, "./channex/restrictions/graphql/resolvers.js")),
]);

const server = new ApolloServer({
  debug: false,
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: async ({ req }) => {
    const token = req.headers["authorization"];
    if (token) {
      try {
        const usuarioActual = await jwt.verify(token, process.env.SECRETO);
        req.usuarioActual = usuarioActual;
        return {
          usuarioActual,
        };
      } catch (error) {}
    }
  },
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1", channexRoutes);
server.applyMiddleware({ app });

export { app, server };
