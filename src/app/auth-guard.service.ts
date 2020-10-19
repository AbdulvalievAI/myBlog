import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { SessionStorageService } from '../services/session-storage/session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _sessionStorageService: SessionStorageService,
    private _router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAuth = !!this._sessionStorageService.getSession();
    if (!isAuth) {
      this._router.navigateByUrl('/main');
    }
    return isAuth;
  }
}
