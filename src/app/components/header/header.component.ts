import { Component, Input, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from '../../../services/user/user.service';
import { ModalService } from '../../../services/modal/modal.service';
import { SessionStorageService } from '../../../services/session-storage/session-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() loginModal: ModalComponent;

  constructor(
    public _userService: UserService,
    public _modalService: ModalService,
    public _sessionStorageService: SessionStorageService
  ) {}

  public logout(): void {
    this._userService.logout();
  }

  ngOnInit(): void {}
}
