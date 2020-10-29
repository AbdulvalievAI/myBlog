import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanDeactivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { map } from 'rxjs/operators';
import { PostComponent } from '../../app/pages/post/post.component';
import { DialogsService } from '../../services/dialogs/dialogs.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanDeactivate<PostComponent> {
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _dialogsService: DialogsService
  ) {}

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

  canDeactivate(component: PostComponent): Observable<boolean> | boolean {
    return (
      component.isDeactivate() ||
      this._dialogsService
        .openConfirm({ description: 'You have not saved your data. Continue?' })
        .afterClosed()
        .pipe(map((response) => response.isResolution))
    );
  }
}
