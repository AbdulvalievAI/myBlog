import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { INew } from '../inew';
import { IResponse } from './iresponse';
import { ISourceData } from '../ISourceData';

@Injectable({
  providedIn: 'root',
})
/** Сервия для работы с внешним API постов/новостей */
export class NewsApiService implements ISourceData {
  private _apiUrl = 'https://newsapi.org/v2/';
  private _apiKey = '44caf8fd958444179e57d926c439f559';
  private _page = 1;

  constructor(private httpClient: HttpClient) {}

  private getEverything(page: number, query): Observable<INew[]> {
    return this.getConfig('everything', `q=${query}&page=${page}`);
  }

  private getConfig(method: string, filters: string): Observable<INew[]> {
    return this.httpClient
      .get<IResponse>(
        `${this._apiUrl}${method}?apiKey=${this._apiKey}&${filters}`
      )
      .pipe(
        map((res) => res.articles),
        map((articles) =>
          articles.map((itemNew) => {
            return {
              url: itemNew.url,
              title: itemNew.title,
              description: itemNew.description,
              author: itemNew.author,
              publishedAt: itemNew.publishedAt,
            };
          })
        )
      );
  }

  public getPosts(): Observable<INew[]> {
    const config = this.getEverything(this._page, 'bitcoin');
    config.subscribe({
      next: (news) => {
        if (news.length) {
          this._page += 1;
        }
      },
    });
    return config;
  }
}