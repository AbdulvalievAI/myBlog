import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss'],
})
export class FloatingActionButtonComponent {
  @Output() clickBtn: EventEmitter<any> = new EventEmitter<any>();
}
