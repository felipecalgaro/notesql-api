# NotesQL API

## What I Learned

- How to develop a GraphQL API using SOLID principles, especially Dependency Inversion
  - This allowed me to write tests for the logic of my app completely independent of the GraphQL language and the database layer
- How to generate a customized avatar for the user and have it stored in AWS S3
- How to handle Authentication in a GraphQL API

## Overview

This is the server side of NotesQL. It's a platform for creating, reading, updating and deleting notes, with user creation and authentication. This API integrates GraphQL and Apollo Server with SOLID principles, uses Vitest for testing, Prisma ORM with PostgreSQL for database management, and AWS S3 for image storage.

The client side repository is in: [https://github.com/felipecalgaro/notesql-client](https://github.com/felipecalgaro/notesql-client)

## Table of Contents

1. [Schema](#schema)
2. [Database models](#database-models)
3. [Tests](#tests)
4. [Avatar Generation & Upload](#avatar-generation--upload)
5. [License](#license)

## Schema

### Structure

<img width="2398" alt="notesql-2" src="https://github.com/user-attachments/assets/790befba-3635-453f-a1a1-5403787cb053" />

### User

- #### Types

```graphql
type User {
  id: ID!
  notes: [Note!]
  name: String!
  email: String!
  password: String!
  avatar_url: String
  created_at: DateTime!
}
```

- #### Queries

  - `authenticateUser(email: String!, password: String!): AuthPayload!`
  - `getUserAndNotes: User!`

- #### Mutations

  - `createUser(user: UserInput!): AuthPayload!`

### Note

- #### Types

```graphql
type Note {
  id: ID!
  author: User!
  title: String!
  body: String!
  priority: Booelan!
  status: Status!
  created_at: DateTime!
  updated_at: DateTime!
}
```

- #### Mutations

  - `writeNote(note: NoteInput!): Note!`
  - `prioritizeNote(id: ID!, priority: Boolean!): Note!`
  - `updateStatus(id: ID!, status: Status!): Note!`
  - `deleteNote(id: ID!): Boolean!`

## Database Models

![notesql-1](https://github.com/user-attachments/assets/6efe7cd9-ec18-4ca2-b699-61e9900d2f47)

## Tests

The Dependency Inversion Principle is also used on tests. This feature allows the implementation of an in-memory repository that simulates a database, allowing all the tests to cover purely the business logic of the API.

## Avatar Generation & Upload

This section contains information about the process of providing the user an avatar automatically after they submit the register form.

1. Firstly, an avatar with the first character of their name is drawn using the _canvas_ library
2. The avatar is then stored locally in the `uploads` folder as a PNG file
3. The file is sent to an S3 Bucket and its access URL is returned
4. The file is removed from the `uploads` folder
5. Finally, the user is created in the database with the _avatar_url_ field set to their avatar access URL on AWS

## License

This project is licensed under the ISC License.
