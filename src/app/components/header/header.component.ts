import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { SessionStorageService } from '../../../services/session-storage/session-storage.service';
import { DialogsService } from '../../../services/dialogs/dialogs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public userService: UserService,
    public sessionStorageService: SessionStorageService,
    private _dialogsService: DialogsService
  ) {}

  public logout(): void {
    this.userService.logout();
  }

  public personBtnHandler(): void {
    this._dialogsService.openLogin();
  }
}
