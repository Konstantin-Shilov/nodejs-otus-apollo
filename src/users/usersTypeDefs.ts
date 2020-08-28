import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    users: [User!]!
  }

  type CreateUserMutationResponse implements MutationResponse {
    success: Boolean!
    message: String!
    user: User!
  }

  extend type Mutation {
    addUser(userData: UserInput): CreateUserMutationResponse
  }

  input UserInput {
    email: String!
    name: String!
    password: String!
  }

  type User {
    id: String!
    email: String!
    name: String!
    posts: [Post!]!
  }
`;

export default typeDefs;
