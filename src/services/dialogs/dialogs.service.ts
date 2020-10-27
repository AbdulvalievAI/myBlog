import { Injectable } from '@angular/core';
import { LoginFormDialogComponent } from '../../app/components/dialogs/login-form-dialog/login-form-dialog.component';
import { RegistrationFormDialogComponent } from '../../app/components/dialogs/registration-form-dialog/registration-form-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';
import { IDialogCloseResponse } from '../../interfaces/dialog-close-response.interface';
import { ComponentType } from '@angular/cdk/overlay';
import { DialogEnum } from '../../enums/dialog.enum';

const DIALOG_CONFIG: MatDialogConfig = {
  width: '500px',
};

@Injectable({
  providedIn: 'root',
})
/** Сервис для работы с диалоговыми окнами */
export class DialogsService {
  constructor(private _dialog: MatDialog) {}

  /** Открытие диалогового окна авторизации */
  public openLogin(): MatDialogRef<LoginFormDialogComponent> {
    return this.generateDialog(LoginFormDialogComponent);
  }

  /** Открытие диалогового окна регистрации */
  public openRegistration(): MatDialogRef<RegistrationFormDialogComponent> {
    return this.generateDialog(RegistrationFormDialogComponent);
  }

  /** Генерация, открытие и обработка события закрытия диалогового окна по переданному компоненту */
  private generateDialog<T>(component: ComponentType<T>): MatDialogRef<T> {
    const dialogRef = this._dialog.open<
      T,
      MatDialogConfig,
      IDialogCloseResponse
    >(component, DIALOG_CONFIG);
    dialogRef.afterClosed().subscribe({
      next: this.afterClosedHandler.bind(this),
    });
    return dialogRef;
  }

  /** Обработчик события на закрытие диалогового окна */
  private afterClosedHandler(data: IDialogCloseResponse): void {
    if (data && data.openDialog) {
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
