import PostModel, {IPost} from './postModel';

export default class PostsService {
  constructor(private model: typeof PostModel) {}

  async findAll(): Promise<IPost[]> {
    return this.model.find();
  }

  async findOneById(id: string): Promise<IPost> {
    return this.model.findOne({ id });
  }

  async findByAuthors(authorIds: string[]): Promise<IPost[][]> {
    const posts = await this.model
      .find()
      .where('author')
      .in(authorIds);

    return authorIds.map(id => posts.filter(p => p.author == id));
  }

  async create(data: any): Promise<IPost> {
    return this.model.create(data);
  }
}
