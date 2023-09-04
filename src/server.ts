import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

function getPayload(token: string) {
  try {
    if (token) return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://notesql-client.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

const httpServer = http.createServer();

async function bootstrap() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.get("Authorization") || "";
      return getPayload(token.replace("Bearer", ""));
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });

  console.log("server running");
}

bootstrap();

export default httpServer;
