import { IPost } from './IPost';

/** Формат данных для храрения постов в Local Storage */
export interface IPostsLocalStorage {
  [key: string]: IPost;
}
