import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { map } from 'rxjs/operators';
// TODO добавить CanDeactivate
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._userService.isAuth$.pipe(
      map((isAuth: boolean) => {
        if (!isAuth) {
          this._router.navigateByUrl('/main');
        }
        return isAuth;
      })
    );
  }
}
