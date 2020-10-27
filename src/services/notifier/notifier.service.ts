import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

type typeSnackBar = 'default' | 'error';
@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  constructor(private _snackBar: MatSnackBar) {}

  /** Отображение всплывающего окна "snackBar" */
  public snackBar(
    type: typeSnackBar,
    message: string,
    config?: MatSnackBarConfig<any>
  ): void {
    const defaultConfig: MatSnackBarConfig<any> = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      ...(type === 'error' && { panelClass: 'snack-bar-error' }),
    };
    this._snackBar.open(
      message,
      'Close',
      Object.assign(defaultConfig, config || {})
    );
  }
}
