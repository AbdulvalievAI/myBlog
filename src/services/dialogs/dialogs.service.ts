import { Injectable } from '@angular/core';
import { LoginFormDialogComponent } from '../../app/components/dialogs/login-form-dialog/login-form-dialog.component';
import { RegistrationFormDialogComponent } from '../../app/components/dialogs/registration-form-dialog/registration-form-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';
import { IDialogCloseResponse } from '../../interfaces/dialog-close-response.interface';
import { DialogEnum } from '../../enums/dialog.enum';
import { ConfirmDialogComponent } from '../../app/components/dialogs/confirm-dialog/confirm-dialog.component';
import { IDialogConfirmData } from '../../interfaces/dialog-confirm-data.interface';
import { ComponentType } from '@angular/cdk/overlay';

const DEFAULT_CONFIG: MatDialogConfig = {
  width: '500px',
  autoFocus: false,
};

@Injectable({
  providedIn: 'root',
})
/** Сервис для работы с диалоговыми окнами */
export class DialogsService {
  constructor(private _dialog: MatDialog) {}

  /** Открытие диалогового окна авторизации */
  public openLogin(): MatDialogRef<
    LoginFormDialogComponent,
    IDialogCloseResponse
  > {
    return this.generateDialog(LoginFormDialogComponent);
  }

  /** Открытие диалогового окна регистрации */
  public openRegistration(): MatDialogRef<
    RegistrationFormDialogComponent,
    IDialogCloseResponse
  > {
    return this.generateDialog(RegistrationFormDialogComponent);
  }

  /** Открытие диалогового окна подтверждения действия */
  public openConfirm(
    data: IDialogConfirmData
  ): MatDialogRef<ConfirmDialogComponent, IDialogCloseResponse> {
    return this.generateDialog(ConfirmDialogComponent, { data });
  }

  /** Генерация, открытие и обработка события закрытия диалогового окна по переданному компоненту */
  private generateDialog<T>(
    component: ComponentType<T>,
    config?: MatDialogConfig
  ): MatDialogRef<T, IDialogCloseResponse> {
    const dialogRef = this._dialog.open<
      T,
      MatDialogConfig,
      IDialogCloseResponse
    >(component, Object.assign(DEFAULT_CONFIG, config || {}));
    dialogRef.afterClosed().subscribe({
      next: this.afterClosedHandler.bind(this),
    });
    return dialogRef;
  }

  /** Обработчик события на закрытие диалогового окна */
  private afterClosedHandler(data: IDialogCloseResponse): void {
    if (data?.openDialog) {
      this.openDialogHandler(data.openDialog);
    }
  }

  /** Обработчик события на открытие нового диалогового окна при закрытии текущего */
  private openDialogHandler(openDialog: keyof typeof DialogEnum): void {
    switch (openDialog) {
      case 'Login':
        this.openLogin();
        break;
      case 'Registration':
        this.openRegistration();
        break;
    }
  }
}
