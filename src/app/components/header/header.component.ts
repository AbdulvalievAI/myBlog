import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { SessionStorageService } from '../../../services/session-storage/session-storage.service';
import { DialogsService } from '../../../services/dialogs/dialogs.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthUser = false;
  private _isSubscribe = true;

  constructor(
    private _userService: UserService,
    public sessionStorageService: SessionStorageService,
    private _dialogsService: DialogsService
  ) {}

  public logout(): void {
    this._userService.logout();
  }

  public personBtnHandler(): void {
    this._dialogsService.openLogin();
  }

  ngOnInit(): void {
    this._userService.isAuth$
      .pipe(takeWhile(() => this._isSubscribe))
      .subscribe((isAuth) => (this.isAuthUser = isAuth));
  }

  ngOnDestroy(): void {
    this._isSubscribe = false;
  }
}
