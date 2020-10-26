import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { ValidatorsService } from '../../../../services/validators/validators.service';
import { takeWhile } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from '../../../../services/notifier/notifier.service';
import { RegistrationFormDialogComponent } from '../registration-form-dialog/registration-form-dialog.component';

@Component({
  selector: 'app-login-form-dialog',
  templateUrl: './login-form-dialog.component.html',
  styleUrls: ['./login-form-dialog.component.scss'],
})
export class LoginFormDialogComponent implements OnInit, OnDestroy {
  public loginFG: FormGroup;
  public loginErrors: { [key: string]: string } = {};
  private _isUnsubscribe = false;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _validatorsService: ValidatorsService,
    private _dialog: MatDialog,
    private _notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.loginFG = this._fb.group({
      login: ['', this._validatorsService.login],
      password: ['', this._validatorsService.password],
    });
    this.loginFG.statusChanges
      .pipe(takeWhile(() => !this._isUnsubscribe))
      .subscribe(() => {
        this.loginErrors = this._validatorsService.getMessagesErrors(
          this.loginFG
        );
      });
  }

  ngOnDestroy(): void {
    this._isUnsubscribe = true;
  }

  public loginHandler(): void {
    this._userService
      .login(this.loginFG.value.login, this.loginFG.value.password)
      .pipe(takeWhile(() => !this._isUnsubscribe))
      .subscribe({
        next: () => {
          this._dialog.closeAll();
        },
        error: (err) => {
          this._notifierService.snackBar('error', err.message);
        },
      });
  }

  public btnRegistrationHandler(): void {
    this._dialog.closeAll();
    this._dialog.open(RegistrationFormDialogComponent, {
      width: '500px',
    });
  }
}
