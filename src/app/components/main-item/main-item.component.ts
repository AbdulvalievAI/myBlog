import { Component, Input } from '@angular/core';
import { IPost } from '../../../interfaces/IPost';

@Component({
  selector: 'app-main-item',
  templateUrl: './main-item.component.html',
  styleUrls: ['./main-item.component.scss'],
})
export class MainItemComponent {
  @Input() post: IPost;
}
