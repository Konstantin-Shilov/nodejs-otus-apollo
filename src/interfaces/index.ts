import { IServices } from '../services';
import DataLoader from 'dataloader';

export interface IContext {
  services: IServices;
  dataLoaders: WeakMap<any, DataLoader<string, any, string>>;
}
