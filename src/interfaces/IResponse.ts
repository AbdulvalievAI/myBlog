import { IArticle } from './IArticle';

/** Формат данных ответа от api */
export interface IResponse {
  status: string;
  totalResults: number;
  articles: Array<IArticle>;
}
