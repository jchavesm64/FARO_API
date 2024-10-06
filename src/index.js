import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import path from 'path';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const server = new ApolloServer({
    debug: false,
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: async ({ req }) => {
        const token = req.headers['authorization'];
        if (token !== null) {
            try {
                const usuarioActual = await jwt.verify(token, process.env.SECRETO);
                req.usuarioActual = usuarioActual;
                return {
                    usuarioActual
                };
            } catch (error) { }
        }
    },
})

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
server.applyMiddleware({ app });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, dbName: 'dev-mau' }).then(
    () => {
        console.log('Database connected')
        app.listen(
            { port: process.env.PORT || 4000 },
            () => console.log(`Server is Running in http://localhost:4000${server.graphqlPath}`)
        )
    }
)
