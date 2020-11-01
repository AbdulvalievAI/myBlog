import { Injectable } from '@angular/core';
import { ISourceData } from '../../interfaces/source-data.interface';
import { Observable } from 'rxjs';
import { IPost } from '../../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export abstract class SourceDataService implements ISourceData {
  abstract getPosts(page: number, pageSize: number): Observable<IPost[]>;
}
