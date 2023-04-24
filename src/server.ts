import { ApolloServer } from "apollo-server";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

async function bootstrap() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { port } = await server.listen();

  console.log("server running on port", port);
}

bootstrap();
