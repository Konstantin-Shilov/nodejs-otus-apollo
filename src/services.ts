import UsersService from './users/usersService';
import UserModel from './users/userModel';
import PostsService from './posts/postsService';
import PostModel from './posts/postModel';

export interface IServices {
  usersService: UsersService;
  postsService: PostsService;
}

const services = {
  usersService: new UsersService(UserModel),
  postsService: new PostsService(PostModel),
};

export default services;
