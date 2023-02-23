import { ApolloServer, gql } from "apollo-server";

async function bootstrap() {
  const typeDefs = gql`
    type User {
      id: ID!
      name: String!
      email: String!
      password: String!
      avatar_url: String
      created_at: Float!
    }

    type Note {
      id: ID!
      author: User!
      title: String!
      body: String!
      is_priority: Boolean!
      status: String!
      deleted_at: Float!
      created_at: Float!
    }

    type Query {
      users: [User!]!
      authenticate(email: String!, password: String!): User
    }

    type Mutation {
      createUser(name: String!, email: String!, password: String!): User
    }
  `;

  const users = [
    {
      id: 1,
      name: "Felipe",
      email: "p@g.c",
      password: "vfd32t4oer0@",
      avatar_url: "kcokfo.png",
      created_at: Date.now(),
    },
    {
      id: 2,
      name: "Felipe",
      email: "p@g.c",
      password: "teste",
      avatar_url: null,
      created_at: Date.now(),
    },
  ];

  const resolvers = {
    Query: {
      users: () => users,
      authenticate: (_: any, args: { email: string; password: string }) => {
        return users.find(
          (user) => user.email === args.email && user.password === args.password
        );
      },
    },
    Mutation: {
      createUser: (
        _: any,
        args: { name: string; email: string; password: string }
      ) => {
        const user = {
          id: Number(Math.random().toFixed(2)) * 100,
          name: args.name,
          email: args.email,
          password: args.password,
          avatar_url: null,
          created_at: Date.now(),
        };

        users.push(user);

        return user;
      },
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  const { port } = await server.listen();

  console.log("server running on port", port);
}

bootstrap();
