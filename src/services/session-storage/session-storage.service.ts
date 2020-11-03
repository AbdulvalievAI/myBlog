import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
/** Сервис для работы с sessionStorage */
export class SessionStorageService {
  private _sessionStorage: Storage;
  private _keyUserStorage = 'user';
  constructor() {
    this._sessionStorage = window.sessionStorage;
  }

  /** Сохранение сессии переданного пользователя */
  public saveSession(user: IUser): void {
    this._sessionStorage.setItem(this._keyUserStorage, JSON.stringify(user));
  }

  /** Получение сессии текущего пользователя */
  public getSession(): IUser | null {
    let result = null;
    const user = this._sessionStorage.getItem(this._keyUserStorage);
    if (user) {
      result = JSON.parse(user);
    }
    return result;
  }

  /** Отчистка сессии */
  public clearSession(): void {
    this._sessionStorage.clear();
  }
}
