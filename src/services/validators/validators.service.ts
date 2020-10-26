import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  public password: Validators[] = [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(15),
  ];

  public login: Validators[] = [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ];

  public static getErrorMessage(keyError: string, valueError: any): string {
    switch (keyError) {
      case 'required':
        return `Required field`;
      case 'minlength':
        return `Minimum length ${valueError.requiredLength}`;
      case 'maxlength':
        return `Maximum length ${valueError.requiredLength}`;
      case 'mustMatch':
        return 'Passwords do not match';
      default:
        return 'Invalid data';
    }
  }

  public mustMatchValidator(
    controlName: string,
    matchingControlName: string
  ): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  public getMessagesErrors(formGroup: FormGroup): { [key: string]: string } {
    const result: { [key: string]: string } = {};
    Object.keys(formGroup.controls).forEach((nameControl) => {
      const errors = formGroup.get(nameControl).errors;
      if (errors) {
        result[nameControl] = ValidatorsService.getErrorMessage(
          Object.keys(errors)[0],
          errors[Object.keys(errors)[0]]
        );
      }
    });
    return result;
  }
}
