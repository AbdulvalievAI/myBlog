/** Описание данных поста/новости */
export interface IPost {
  url: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  urlToImage: string;
  content: string;
  source: {
    id: string | number;
    name: string;
  };
}
