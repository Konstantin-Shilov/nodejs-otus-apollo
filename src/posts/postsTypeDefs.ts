import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    posts: [Post!]!
  }

  extend type Mutation {
    addPost(input: PostInput): Post
  }

  input PostInput {
    text: String!
    author: String!
  }

  type Post {
    id: String!
    text: String!
    author: User
    createdAt: String!
  }
`;

export default typeDefs;
