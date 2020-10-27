import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._userService.checkSessionUser().pipe(
      map((isAuth: boolean) => {
        const isMainPage: boolean = state.url.includes('main');
        const isViewPostPage: boolean = state.url.includes('view-post');
        if (isMainPage || isViewPostPage) {
          return true;
        }
        if (!isAuth) {
          this._router.navigateByUrl('/main');
        }
        return isAuth;
      })
    );
  }

  canLoad(route: Route): Observable<boolean> {
    return this.checkAccess(route.path);
  }

  private checkAccess(currentUrl: string): Observable<boolean> {
    return this._userService.checkSessionUser().pipe(
      map((isAuth: boolean) => {
        const isMainPage: boolean = currentUrl.includes('main');
        const isViewPostPage: boolean = currentUrl.includes('view-post');
        if (isMainPage || isViewPostPage) {
          return true;
        }
        if (!isAuth) {
          this._router.navigateByUrl('/main');
        }
        return isAuth;
      })
    );
  }
}
