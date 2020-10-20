import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  public typeContent: 'login' | 'registration' = 'login';
  public loginFG: FormGroup;
  public registrationFG: FormGroup;
  public loginErrors: { [key: string]: string } = {};
  public registrationErrors: { [key: string]: string } = {};

  private subscriptions: Array<Subscription> = [];

  constructor(
    public modalService: ModalService,
    private _fb: FormBuilder,
    private _userService: UserService
  ) {}

  private static getErrorMessage(keyError: string, valueError: any): string {
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
        return 'Error';
    }
  }

  ngOnInit(): void {
    const passwordValidators: Validators[] = [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ];
    const loginValidators: Validators[] = [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ];
    this.loginFG = this._fb.group({
      login: ['', loginValidators],
      password: ['', passwordValidators],
    });
    this.registrationFG = this._fb.group(
      {
        login: ['', loginValidators],
        password: ['', passwordValidators],
        passwordConfirm: ['', passwordValidators],
      },
      { validator: this.checkPasswords('password', 'passwordConfirm') }
    );

    this.subscriptions.push(
      this.loginFG.statusChanges.subscribe(() => {
        this.loginErrors = this.getMessagesErrors(this.loginFG);
      })
    );

    this.subscriptions.push(
      this.registrationFG.statusChanges.subscribe(() => {
        this.registrationErrors = this.getMessagesErrors(this.registrationFG);
      })
    );
  }

  private checkPasswords(
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

  private getMessagesErrors(formGroup: FormGroup): { [key: string]: string } {
    const result: { [key: string]: string } = {};

    Object.keys(formGroup.controls).forEach((nameControl) => {
      const errors = formGroup.get(nameControl).errors;
      if (errors) {
        result[nameControl] = ModalComponent.getErrorMessage(
          Object.keys(errors)[0],
          errors[Object.keys(errors)[0]]
        );
      }
    });

    return result;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscribe) => {
      subscribe.unsubscribe();
    });
  }

  public loginHandler(): void {
    this.subscriptions.push(
      this._userService
        .login(this.loginFG.value.login, this.loginFG.value.password)
        .subscribe({
          next: () => {
            this.modalService.showModal$.next(false);
          },
          error: (err) => {
            window.alert(err);
          },
        })
    );
  }

  public registrationHandler(): void {
    this.subscriptions.push(
      this._userService.registration(this.registrationFG.value).subscribe({
        next: () => {
          this.modalService.showModal$.next(false);
        },
        error: (err) => {
          window.alert(err);
        },
      })
    );
  }
}
