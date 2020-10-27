import { Injectable } from '@angular/core';
import { ISourceData } from '../../interfaces/source-data.interface';
import { Observable } from 'rxjs';
import { IPost } from '../../interfaces/post.interface';
import { IUser } from '../../interfaces/user.interface';
import { IPostsLocalStorage } from '../../interfaces/posts-local-storage.interface';

@Injectable({
  providedIn: 'root',
})
/** Севис для работы с Local Storage */
export class LocalStorageService implements ISourceData {
  private _localStorage: Storage;
  private _keyPostsLocalStorage = 'posts';
  constructor() {
    this._localStorage = window.localStorage;
  }

  /** Получение поста из Local Storage по его id */
  public getPostById(id: IPost['id']): IPost {
    let result: IPost;
    const localStorageData = this._localStorage.getItem(
      this._keyPostsLocalStorage
    );
    if (localStorageData) {
      const postParse = JSON.parse(localStorageData) as IPostsLocalStorage;
      result = postParse[id];
    }
    return result;
  }

  /** Получение постов из Local Storage по странично */
  public getPosts(page: number, pageSize: number): Observable<IPost[]> {
    return new Observable((subscriber) => {
      let result: Array<IPost> = [];
      const localStorageData = this._localStorage.getItem(
        this._keyPostsLocalStorage
      );
      if (localStorageData) {
        const postParse = JSON.parse(localStorageData) as IPostsLocalStorage;
        result = this.postsMapToArray(postParse);
        const end = page * pageSize;
        const start = end - pageSize;
        result = result.slice(start, end);
      }

      subscriber.next(result);
      subscriber.complete();
    });
  }

  /** Получение всех постов из Local Storage */
  private gatAllPosts(): Observable<IPost[]> {
    return new Observable((subscriber) => {
      let result: Array<IPost> = [];
      const localStorageData = this._localStorage.getItem(
        this._keyPostsLocalStorage
      );
      if (localStorageData) {
        const postParse = JSON.parse(localStorageData) as IPostsLocalStorage;
        result = this.postsMapToArray(postParse);
      }

      subscriber.next(result);
      subscriber.complete();
    });
  }

  /** Сохраняет переданный массив постов в Local Storage */
  public savePosts(newPosts: Array<IPost>): void {
    this.gatAllPosts().subscribe((posts) => {
      const resultPosts: Array<IPost> = [];
      if (posts && posts.length) {
        resultPosts.push(...posts);
      }
      resultPosts.push(...newPosts);
      this._localStorage.setItem(
        this._keyPostsLocalStorage,
        JSON.stringify(this.postsMapToObject(resultPosts))
      );
    });
  }

  /** Удаление поста из Local Storage */
  public removePost(id: IPost['id']): void {
    const localStorageData = this._localStorage.getItem(
      this._keyPostsLocalStorage
    );
    if (localStorageData) {
      const postParse = JSON.parse(localStorageData);
      if (postParse[id]) {
        delete postParse[id];
        this._localStorage.setItem(
          this._keyPostsLocalStorage,
          JSON.stringify(postParse)
        );
      }
    }
  }

  /** Сохранение данных пользователя в Local Storage */
  public saveUser(user: IUser): void {
    this._localStorage.setItem(`user-${user.login}`, JSON.stringify(user));
  }

  /** Запрос данных пользователя из локального хранилища */
  public getUser(login: IUser['login']): IUser | null {
    let result = null;
    const user = this._localStorage.getItem(`user-${login}`);
    if (user) {
      result = JSON.parse(user);
    }
    return result;
  }

  private postsMapToArray(objectPosts: IPostsLocalStorage): Array<IPost> {
    return Object.keys(objectPosts).map((key) => objectPosts[key]);
  }

  private postsMapToObject(arrayPosts: Array<IPost>): IPostsLocalStorage {
    const resultObj = {};
    arrayPosts.forEach((post) => {
      resultObj[post.id] = post;
    });
    return resultObj;
  }
}
