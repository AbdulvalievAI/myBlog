import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent {
  @Input() title: string;
  @Input() fc: AbstractControl | FormControl;
  @Input() type: string;
  @Input() errorMessage: string;
}
