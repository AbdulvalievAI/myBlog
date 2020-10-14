import { Observable } from 'rxjs';
import { INew } from './inew';

export interface ISourceData {
  getPosts(): Observable<INew[]>;
}
