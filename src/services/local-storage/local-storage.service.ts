import { Injectable } from '@angular/core';
import { ISourceData } from '../ISourceData';
import { Observable } from 'rxjs';
import { IPost } from '../IPost';
import { IUser } from '../iuser';

@Injectable({
  providedIn: 'root',
})
/** Севис для работы с локальным хранилещем браузера */
export class LocalStorageService implements ISourceData {
  private _localStorage: Storage;
  private _keyPostsLocalStorage = 'news';
  constructor() {
    this._localStorage = window.localStorage;
  }

  public getPosts(): Observable<IPost[]> {
    return new Observable((subscriber) => {
      let result: Array<IPost> = [];
      const localStorageData = this._localStorage.getItem(
        this._keyPostsLocalStorage
      );
      if (localStorageData) {
        result = JSON.parse(
          this._localStorage.getItem(this._keyPostsLocalStorage)
        );
      }
      subscriber.next(result);
      subscriber.complete();
    });
  }

  /** Сохраняет переданный массив постов в локальное хранилище браузера */
  public savePosts(news: Array<IPost>): void {
    this._localStorage.setItem(
      this._keyPostsLocalStorage,
      JSON.stringify(news)
    );
  }

  /** Сохранение данных пользователя в локальное хранилище */
  public saveUser(user: IUser): void {
    this._localStorage.setItem(`user-${user.login}`, JSON.stringify(user));
  }

  /** Запрос данных пользователя из локального хранилища */
  public getUser(login: string): IUser | null {
    let result = null;
    const user = this._localStorage.getItem(`user-${login}`);
    if (user) {
      result = JSON.parse(user);
    }
    return result;
  }
}
