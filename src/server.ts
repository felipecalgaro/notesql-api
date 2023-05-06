import { ApolloServer } from "apollo-server";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import jwt from "jsonwebtoken";

function getUser(token: string) {
  try {
    if (token) return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function bootstrap() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.get("Authorization") || "";
      return {
        user: getUser(token.replace("Bearer", "")),
      };
    },
  });

  const { port } = await server.listen();

  console.log("server running on port", port);
}

bootstrap();
