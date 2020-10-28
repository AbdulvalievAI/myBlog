import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { ValidatorsService } from '../../../../services/validators/validators.service';
import { takeWhile } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from '../../../../services/notifier/notifier.service';
import { IDialogCloseResponse } from '../../../../interfaces/dialog-close-response.interface';

@Component({
  selector: 'app-login-form-dialog',
  templateUrl: './login-form-dialog.component.html',
  styleUrls: ['../dialog.component.scss'],
})
export class LoginFormDialogComponent implements OnInit, OnDestroy {
  public loginFG: FormGroup;
  public loginErrors: { [key: string]: string } = {};
  private _isSubscribe = true;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _validatorsService: ValidatorsService,
    private _dialogRef: MatDialogRef<
      LoginFormDialogComponent,
      IDialogCloseResponse
    >,
    private _notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.loginFG = this._fb.group({
      login: ['', this._validatorsService.login],
      password: ['', this._validatorsService.password],
    });
    this.loginFG.statusChanges
      .pipe(takeWhile(() => this._isSubscribe))
      .subscribe(() => {
        this.loginErrors = this._validatorsService.getMessagesErrors(
          this.loginFG
        );
      });
  }

  ngOnDestroy(): void {
    this._isSubscribe = false;
  }

  public loginHandler(): void {
    this._userService
      .login(this.loginFG.value.login, this.loginFG.value.password)
      .pipe(takeWhile(() => this._isSubscribe))
      .subscribe({
        next: () => {
          this._dialogRef.close();
        },
        error: (err) => {
          this._notifierService.snackBar('Error', err.message);
        },
      });
  }

  public btnRegistrationHandler(): void {
    this._dialogRef.close({ openDialog: 'Registration' });
  }
}
