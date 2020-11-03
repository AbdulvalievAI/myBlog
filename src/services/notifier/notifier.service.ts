import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBarEnum } from '../../enums/snack-bar.enum';

@Injectable({
  providedIn: 'root',
})
/** Сервис для работы со всплывающими сообщениями */
export class NotifierService {
  constructor(private _snackBar: MatSnackBar) {}

  /** Отображение всплывающего окна "snackBar" */
  public snackBar(
    type: keyof typeof SnackBarEnum,
    message: string,
    config?: MatSnackBarConfig<any>
  ): void {
    const defaultConfig: MatSnackBarConfig<any> = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      ...(type === 'Error' && { panelClass: 'snack-bar-error' }),
    };
    this._snackBar.open(
      message,
      'Close',
      Object.assign(defaultConfig, config || {})
    );
  }
}
