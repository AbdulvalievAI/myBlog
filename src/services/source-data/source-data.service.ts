import { Injectable } from '@angular/core';
import { ISourceData } from '../../interfaces/source-data.interface';
import { Observable } from 'rxjs';
import { IPost } from '../../interfaces/post.interface';
import { environment } from '../../environments/environment';
import { NewsApiService } from '../news-api/news-api.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SourceDataService implements ISourceData {
  private _sourceService: ISourceData;

  constructor(
    newsApiService: NewsApiService,
    localStorageService: LocalStorageService
  ) {
    // TODO переключение между сервисами - переделать на более красивое решение
    switch (environment.sourceData) {
      case 'api':
        this._sourceService = newsApiService;
        break;
      case 'local':
        this._sourceService = localStorageService;
        break;
    }
  }

  public getPosts(page: number, pageSize: number): Observable<IPost[]> {
    return this._sourceService.getPosts(page, pageSize);
  }
}
