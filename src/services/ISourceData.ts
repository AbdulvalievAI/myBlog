import { Observable } from 'rxjs';
import { IPost } from './IPost';

/** Описание интерфейса с методов для полученя постов/новостей */
export interface ISourceData {
  /**
   * @description Возвращает масив постов/новостей
   * @param page страница
   * @param pageSize количество постов в странице
   */
  getPosts(page: number, pageSize: number): Observable<IPost[]>;
}
