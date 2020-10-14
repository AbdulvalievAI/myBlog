import { Component, Input } from '@angular/core';
import { INew } from '../../services/inew';

@Component({
  selector: 'app-main-item',
  templateUrl: './main-item.component.html',
  styleUrls: ['./main-item.component.scss'],
})
export class MainItemComponent {
  @Input() newItem: INew;

  public goToLink(url: string): void {
    window.open(url, '_blank');
  }
}
