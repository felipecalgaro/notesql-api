import { ApolloServer } from "apollo-server";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
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

const httpServer = http.createServer();

async function bootstrap() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      res.setHeader(
        "Access-Control-Allow-Origin",
        process.env.CLIENT_URI as string
      );
      const token = req.get("Authorization") || "";
      return getPayload(token.replace("Bearer", ""));
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.listen(4000);

  console.log("server running");
}

bootstrap();
