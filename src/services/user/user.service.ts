import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { IUser } from '../../interfaces/user.interface';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Observable, of } from 'rxjs';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { Router } from '@angular/router';
import { NotifierService } from '../notifier/notifier.service';

@Injectable({
  providedIn: 'root',
})
/** Сервис для работы с пользователем */
export class UserService {
  constructor(
    private _localStorageService: LocalStorageService,
    private _sessionStorageService: SessionStorageService,
    private _router: Router,
    private _notifierService: NotifierService
  ) {}

  /** Метод для трансформации строки Md5 */
  private static strToHash(value: string): string {
    return Md5.hashStr(value).toString();
  }

  /** Метод авторизации пользователя */
  public login(login: string, password: string): Observable<IUser> {
    return new Observable<IUser>((subscriber) => {
      const user = this._localStorageService.getUser(login);
      if (user) {
        const hashPass = UserService.strToHash(password);
        if (hashPass === user.password) {
          subscriber.next(user);
          this._sessionStorageService.saveSession(user);
          this._notifierService.snackBar('Default', `Hello ${user.login}!`);
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
        user.password = UserService.strToHash(userData.password);
        this._localStorageService.saveUser(user);
        this._sessionStorageService.saveSession(user);
        subscriber.next(user);
        this._notifierService.snackBar('Default', `Welcome ${user.login}!`);
        subscriber.complete();
        return;
      }
      subscriber.error(new Error('This user already exists'));
    });
  }

  /** Деавторизация пользователя */
  public logout(): void {
    this._sessionStorageService.clearSession();
    // TODO сделать выброс на экран Main через AuthGuard
    if (this._router.url.includes('/post/')) {
      this._router.navigateByUrl('/main');
    }
    this._notifierService.snackBar('Default', 'Logout success. See you later!');
  }

  /** Проверка авторизирован в данный момент пользователь */
  public checkSessionUser(): Observable<boolean> {
    // TODO переделать на subject
    const isAuth: boolean = !!this._sessionStorageService.getSession();
    return of(isAuth);
  }
}
