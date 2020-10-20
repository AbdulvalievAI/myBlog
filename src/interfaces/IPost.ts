/** Описание данных поста */
export interface IPost {
  id: string;
  typeSource: 'local' | 'api';
  title: string;
  description: string;
  author: string;
  publishedAt: string;
}
