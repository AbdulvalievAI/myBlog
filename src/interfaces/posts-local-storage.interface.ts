import { IPost } from './post.interface';

/** Формат данных для храрения постов в Local Storage */
export interface IPostsLocalStorage {
  [key: string]: IPost;
}
