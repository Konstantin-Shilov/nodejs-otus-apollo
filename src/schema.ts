import { gql, makeExecutableSchema } from 'apollo-server-express';
import usersTypeDefs from './users/usersTypeDefs';
import postsTypeDefs from './posts/postsTypeDefs';
import userResolvers from './users/usersResolvers';
import postResolvers from './posts/postsResolvers';

const typeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  interface MutationResponse {
    success: Boolean!
    message: String!
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, usersTypeDefs, postsTypeDefs],
  resolvers: [userResolvers, postResolvers],
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

export default schema;
