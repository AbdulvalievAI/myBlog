import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPost } from '../../interfaces/post.interface';
import { IResponse } from '../../interfaces/response.interface';
import { ISourceData } from '../../interfaces/source-data.interface';
import { Md5 } from 'ts-md5/dist/md5';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
/** Сервия для работы с внешним API постов/новостей */
export class NewsApiService implements ISourceData {
  constructor(
    private _httpClient: HttpClient,
    private _localStorageService: LocalStorageService
  ) {}

  /** Генерация id для поста с API */
  private static generateId(
    title: IPost['title'],
    date: IPost['publishedAt']
  ): string {
    return Md5.hashStr(`${title}_${date}`).toString();
  }

  /** Получение постов в тренде */
  private getTopHeadlines(
    page: number,
    pageSize: number,
    country: string
  ): Observable<IPost[]> {
    return this.getConfig(
      'top-headlines',
      `country=${country}&pageSize=${pageSize}&page=${page}`
    );
  }

  /** Получение общего списка постов поиском */
  private getEverything(
    page: number,
    pageSize: number,
    query: string
  ): Observable<IPost[]> {
    return this.getConfig(
      'everything',
      `q=${query}&pageSize=${pageSize}&page=${page}`
    );
  }

  private getConfig(method: string, filters: string): Observable<IPost[]> {
    return this._httpClient
      .get<IResponse>(
        `${environment.api.url}${method}?apiKey=${environment.api.key}&${filters}`
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

  public getPosts(page: number, pageSize: number): Observable<IPost[]> {
    return new Observable((subscriber) => {
      // const config = this.getEverything(page, pageSize, 'bitcoin');
      const config = this.getTopHeadlines(page, pageSize, 'us');
      config.subscribe({
        next: (posts) => {
          if (posts.length) {
            this._localStorageService.savePosts(posts);
          }
          this._localStorageService
            .getPosts(page, pageSize)
            .subscribe((postsLocal) => {
              subscriber.next(postsLocal);
              subscriber.complete();
            });
        },
        error: (err) => {
          subscriber.error(err);
        },
      });
    });
  }
}
