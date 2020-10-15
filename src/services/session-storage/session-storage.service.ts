import { Injectable } from '@angular/core';
import { IUser } from '../iuser';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private _sessionStorage: Storage;
  private _keyUserStorage = 'user';
  constructor() {
    this._sessionStorage = window.sessionStorage;
  }

  public saveSession(user: IUser): void {
    this._sessionStorage.setItem(this._keyUserStorage, JSON.stringify(user));
  }

  public getSession(): IUser | null {
    let result = null;
    const user = this._sessionStorage.getItem(this._keyUserStorage);
    if (user) {
      result = JSON.parse(user);
    }
    return result;
  }

  public clearSession(): void {
    this._sessionStorage.clear();
  }
}
