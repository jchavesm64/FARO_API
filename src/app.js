import { ApolloServer } from "apollo-server-express";
import express from "express";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import path from "path";
import jwt from "jsonwebtoken";
import channexRoutes from "./channex/routes";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./types")));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

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
