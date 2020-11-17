import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { SessionStorageService } from '../../../services/session-storage/session-storage.service';
import { DialogsService } from '../../../services/dialogs/dialogs.service';
import { takeWhile } from 'rxjs/operators';
import { ThemeService } from '../../../services/theme/theme.service';
import { ITheme } from '../../../interfaces/theme.interface';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('darkToggle') darkToggle: MatSlideToggle;
  @ViewChild('contrastToggle') contrastToggle: MatSlideToggle;
  public isAuthUser = false;
  private _isSubscribe = true;
  public isDark: boolean;
  public isContrast: boolean;

  constructor(
    private _userService: UserService,
    public sessionStorageService: SessionStorageService,
    private _dialogsService: DialogsService,
    public themeService: ThemeService,
    private _localStorageService: LocalStorageService
  ) {
    const activeTheme = this.themeService.getActiveTheme();
    this.isDark = activeTheme.isDark;
    this.isContrast = activeTheme.isContrast;
  }

  public logout(): void {
    this._dialogsService
      .openConfirm({ description: 'Do you really want to leave?' })
      .afterClosed()
      .subscribe((response) => {
        if (response.isResolution) {
          this._userService.logout();
        }
      });
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

  public themHandler(id: ITheme['id']): void {
    this.applyTheme(id);
  }

  public toggleHandler(): void {
    const activeTheme = this.themeService.getActiveTheme();
    this.applyTheme(activeTheme.id);
  }

  private applyTheme(themeId: ITheme['id']): void {
    this.themeService.applyTheme(themeId, this.isDark, this.isContrast);
  }
}
