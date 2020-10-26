import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { SessionStorageService } from '../../../services/session-storage/session-storage.service';
import { LoginFormDialogComponent } from '../dialogs/login-form-dialog/login-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public userService: UserService,
    public sessionStorageService: SessionStorageService,
    private _dialog: MatDialog
  ) {}

  public logout(): void {
    this.userService.logout();
  }

  public personBtnHandler(): void {
    this._dialog.open(LoginFormDialogComponent, {
      width: '500px',
    });
  }
}
