import { IArticle } from './article.interface';

/** Формат данных ответа от api */
export interface IResponse {
  status: string;
  totalResults: number;
  articles: Array<IArticle>;
}
