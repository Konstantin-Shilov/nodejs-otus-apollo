import {IResolvers} from 'apollo-server-express';
import {IContext} from '../interfaces';
import {IUser} from './userModel';
import DataLoader from 'dataloader';

const resolvers: IResolvers = {
  Query: {
    users: async (parent, args, context: IContext, info) => {
      return context.services.usersService.findAll();
    },
  },
  Mutation: {
    addUser: async (_, args, context, info) => {
      const user = await context.services.usersService.create(args.userData);
      return { success: true, message: 'User created', user };
    },
  },
  User: {
    posts: (parent: IUser, args, context: IContext, info) => {
      const { dataLoaders, services } = context;

      let dataLoader = dataLoaders.get(info.fieldNodes);
      if (!dataLoader) {
        dataLoader = new DataLoader(async (ids: readonly string[]) => {
          return services.postsService.findByAuthors([...ids]);
        });

        dataLoaders.set(info.fieldNodes, dataLoader);
      }
      return dataLoader.load(parent.id);
    },
  },
};

export default resolvers;
