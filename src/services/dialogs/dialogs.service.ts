import { Injectable } from '@angular/core';
import { LoginFormDialogComponent } from '../../app/components/dialogs/login-form-dialog/login-form-dialog.component';
import { RegistrationFormDialogComponent } from '../../app/components/dialogs/registration-form-dialog/registration-form-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';
import { IDialogCloseResponse } from '../../interfaces/IDialogCloseResponse';
import { ComponentType } from '@angular/cdk/overlay';

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
    const dialog = this._dialog.open<T, MatDialogConfig, IDialogCloseResponse>(
      component,
      DIALOG_CONFIG
    );
    dialog.afterClosed().subscribe({
      next: (data) => {
        if (data && data.open) {
          switch (data.open) {
            case 'login-form-dialog':
              this.openLogin();
              break;
            case 'registration-form-dialog':
              this.openRegistration();
              break;
          }
        }
      },
    });
    return dialog;
  }
}
