import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { IUser } from '../IUser';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Observable, of } from 'rxjs';
import { SessionStorageService } from '../session-storage/session-storage.service';

@Injectable({
  providedIn: 'root',
})
/** Сервис для работы с пользователем */
export class UserService {
  constructor(
    private _localStorageService: LocalStorageService,
    private _sessionStorageService: SessionStorageService
  ) {}

  private static passToHash(password: string): string {
    return Md5.hashStr(password).toString();
  }

  /** Метод авторизации пользователя */
  public login(login: string, password: string): Observable<IUser> {
    return new Observable<IUser>((subscriber) => {
      const user = this._localStorageService.getUser(login);
      if (user) {
        const hashPass = UserService.passToHash(password);
        if (hashPass === user.password) {
          subscriber.next(user);
          this._sessionStorageService.saveSession(user);
          subscriber.complete();
          return;
        }
      }
      subscriber.error(new Error('Invalid login or password'));
    });
  }

  /** Метод Регистрации пользователя */
  public registration(userData: IUser): Observable<IUser> {
    return new Observable<IUser>((subscriber) => {
      const localStorageData = this._localStorageService.getUser(
        userData.login
      );
      if (!localStorageData) {
        const user = new Object(userData) as IUser;
        user.password = UserService.passToHash(userData.password);
        this._localStorageService.saveUser(user);
        this._sessionStorageService.saveSession(user);
        subscriber.next(user);
        subscriber.complete();
        return;
      }
      subscriber.error(new Error('This user already exists'));
    });
  }

  /** Деавторизация пользователя */
  public logout(): void {
    this._sessionStorageService.clearSession();
  }

  /** Проверка авторизирован в данный момент пользователь */
  public checkSessionUser(): Observable<boolean> {
    const isAuth: boolean = !!this._sessionStorageService.getSession();
    return of(isAuth);
  }
}
