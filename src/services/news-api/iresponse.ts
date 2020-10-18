import { IPost } from '../IPost';

export interface IResponse {
  status: string;
  totalResults: number;
  articles: Array<IPost>;
}
