import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPost } from '../IPost';
import { IResponse } from './IResponse';
import { ISourceData } from '../ISourceData';
import { Md5 } from 'ts-md5/dist/md5';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
/** Сервия для работы с внешним API постов/новостей */
export class NewsApiService implements ISourceData {
  constructor(
    private httpClient: HttpClient,
    private _localStorageService: LocalStorageService
  ) {}
  private _apiUrl = 'https://newsapi.org/v2/';
  private _apiKey = '44caf8fd958444179e57d926c439f559';
  private _page = 1;

  private static generateId(
    title: IPost['title'],
    date: IPost['publishedAt']
  ): string {
    return Md5.hashStr(`${title}_${date}`).toString();
  }

  private getEverything(page: number, query): Observable<IPost[]> {
    return this.getConfig('everything', `q=${query}&page=${page}`);
  }

  private getConfig(method: string, filters: string): Observable<IPost[]> {
    return this.httpClient
      .get<IResponse>(
        `${this._apiUrl}${method}?apiKey=${this._apiKey}&${filters}`
      )
      .pipe(
        map((res) => res.articles),
        map((articles) => {
          return articles.map((article) => {
            return {
              id: NewsApiService.generateId(article.title, article.publishedAt),
              typeSource: 'api',
              title: article.title,
              description: article.description,
              author: article.author,
              publishedAt: article.publishedAt,
            } as IPost;
          });
        })
      );
  }

  public getPosts(): Observable<IPost[]> {
    return new Observable((subscriber) => {
      const config = this.getEverything(this._page, 'bitcoin');
      config.subscribe({
        next: (posts) => {
          if (posts.length) {
            this._localStorageService.savePosts(posts);
            this._page += 1;
          }
          this._localStorageService.getPosts().subscribe((postsLocal) => {
            subscriber.next(postsLocal);
            subscriber.complete();
          });
        },
      });
    });
  }
}
