import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { IUser } from '../iuser';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
/** Сервис для работы с пользователем */
export class UserService {
  constructor(private _localStorageService: LocalStorageService) {}

  private static passToHash(password: string): string {
    return Md5.hashStr(password).toString();
  }

  /** Метод авторизации пользователя */
  public auth(login: string, password: string): IUser | Error {
    const user = this._localStorageService.getUser(login);
    if (user) {
      const hashPass = UserService.passToHash(password);
      if (hashPass === user.password) {
        return user;
      }
    }
    return new Error('Invalid login or password');
  }

  /** Метод Регистрации пользователя */
  public registration(userData: IUser): IUser | Error {
    const localStorageData = this._localStorageService.getUser(userData.login);
    if (!localStorageData) {
      const user = new Object(userData) as IUser;
      user.password = UserService.passToHash(userData.password);
      this._localStorageService.saveUser(user);
      return user;
    }
    return new Error('This user already exists');
  }
}
