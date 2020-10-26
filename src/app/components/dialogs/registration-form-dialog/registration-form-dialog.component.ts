import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { ValidatorsService } from '../../../../services/validators/validators.service';
import { takeWhile } from 'rxjs/operators';
import { NotifierService } from '../../../../services/notifier/notifier.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-form-dialog',
  templateUrl: './registration-form-dialog.component.html',
  styleUrls: ['./registration-form-dialog.component.scss'],
})
export class RegistrationFormDialogComponent implements OnInit, OnDestroy {
  public registrationFG: FormGroup;
  public registrationErrors: { [key: string]: string } = {};
  private _isUnsubscribe = false;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _validatorsService: ValidatorsService,
    private _dialog: MatDialog,
    private _notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.registrationFG = this._fb.group(
      {
        login: ['', this._validatorsService.login],
        password: ['', this._validatorsService.password],
        passwordConfirm: ['', this._validatorsService.password],
      },
      {
        validator: this._validatorsService.mustMatchValidator(
          'password',
          'passwordConfirm'
        ),
      }
    );
    this.registrationFG.statusChanges
      .pipe(takeWhile(() => !this._isUnsubscribe))
      .subscribe(() => {
        this.registrationErrors = this._validatorsService.getMessagesErrors(
          this.registrationFG
        );
      });
  }

  ngOnDestroy(): void {
    this._isUnsubscribe = true;
  }

  public registrationHandler(): void {
    this._userService
      .registration(this.registrationFG.value)
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
}
