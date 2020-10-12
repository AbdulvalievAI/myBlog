import { Component, Input } from '@angular/core';
import { INew } from '../api/inew';

@Component({
  selector: 'app-main-item',
  templateUrl: './main-item.component.html',
  styleUrls: ['./main-item.component.scss'],
})
export class MainItemComponent {
  @Input() newItem: INew;
}
