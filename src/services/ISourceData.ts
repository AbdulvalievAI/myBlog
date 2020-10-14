import { Observable } from 'rxjs';
import { INew } from './inew';

/** Описание интерфейса с методов для полученя постов/новостей */
export interface ISourceData {
  /** Возвращает масив постов/новостей */
  getPosts(): Observable<INew[]>;
}
