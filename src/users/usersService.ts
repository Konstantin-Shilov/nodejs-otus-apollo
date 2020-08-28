import UserModel, {IUser} from './userModel';

export default class UsersService {
  constructor(private model: typeof UserModel) {}

  async findAll(): Promise<IUser[]> {
    return this.model.find();
  }

  async findOneByEmail(email: string): Promise<IUser> {
    return this.model.findOne({ email });
  }

  async findOneById(id: string): Promise<IUser> {
    return this.model.findById(id);
  }

  async findByIds(ids: string[]): Promise<IUser[]> {
    const users = await this.model
      .find()
      .where('_id')
      .in(ids);
    return ids.map(id => users.find(u => u.id === id));
  }

  async create(data: any): Promise<IUser> {
    return this.model.create(data);
  }
}
