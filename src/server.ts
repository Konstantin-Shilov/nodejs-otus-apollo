require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';

import schema from './schema';
import connectDB from './db';
import app from './app';
import services from './services';

const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV;
const isDevMode = MODE === 'development';

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(3)],
  playground: {
    endpoint: MODE === 'production' ? '' : `http://localhost:${PORT}/graphql`,
    settings: {
      'request.credentials': 'include'
    }
  },
  context: ({ req }) => {
    return {
      req,
      services,
      dataLoaders: new WeakMap(),
    };
  },
  formatError: err => {
    // Mongo Errors
    if (err.message.startsWith('E11000')) {
      return new Error('Email already taken');
    }
    return err;
  },
  debug: isDevMode,
});

server.applyMiddleware({ app, path: '/graphql' });

connectDB().then(() =>
  app.listen(PORT, () => {
    console.log(`Server running in ${MODE} mode on port ${PORT}`);
  }),
);
