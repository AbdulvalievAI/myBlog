import { INew } from '../inew';

export interface IResponse {
  status: string;
  totalResults: number;
  articles: Array<INew>;
}
