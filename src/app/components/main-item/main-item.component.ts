import { Component, Input } from '@angular/core';
import { IPost } from '../../../services/IPost';

@Component({
  selector: 'app-main-item',
  templateUrl: './main-item.component.html',
  styleUrls: ['./main-item.component.scss'],
})
export class MainItemComponent {
  @Input() post: IPost;
}
