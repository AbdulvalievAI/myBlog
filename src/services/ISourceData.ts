import { Observable } from 'rxjs';
import { IPost } from './IPost';

/** Описание интерфейса с методов для полученя постов/новостей */
export interface ISourceData {
  /** Возвращает масив постов/новостей */
  getPosts(): Observable<IPost[]>;
}
