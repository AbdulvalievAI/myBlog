import { Component } from '@angular/core';
import { ModalService } from '../services/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'my-blog';

  constructor(public _modalService: ModalService) {}
}
