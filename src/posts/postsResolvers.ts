import {IResolvers} from 'apollo-server-express';
import {IContext} from '../interfaces';
import {IPost} from './postModel';
import DataLoader from 'dataloader';

const resolvers: IResolvers = {
  Query: {
    posts: async (parent, args, context: IContext, info) => {
      return context.services.postsService.findAll();
    },
  },
  Mutation: {
    addPost: async (_, args, context: IContext, info) => {
      return await context.services.postsService.create(args.input);
    },
  },
  Post: {
    author: (parent: IPost, args, context: IContext, info) => {
      const { dataLoaders, services } = context;

      let dataLoader = dataLoaders.get(info.fieldNodes);
      if (!dataLoader) {
        dataLoader = new DataLoader(async (ids: readonly string[]) => {
          return services.usersService.findByIds([...ids]);
        });

        dataLoaders.set(info.fieldNodes, dataLoader);
      }
      return dataLoader.load(parent.author);
    },
  },
};

export default resolvers;
