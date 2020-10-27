import { ErrorHandler, Injectable } from '@angular/core';
import { Error } from 'tslint/lib/error';
import { NotifierService } from '../notifier/notifier.service';

const MAX_LENGTH_MESSAGE = 60;

@Injectable({
  providedIn: 'root',
})
export class ErrorsService implements ErrorHandler {
  constructor(private _notifierService: NotifierService) {}

  private static transformMessage(message: string): string {
    if (message.length >= MAX_LENGTH_MESSAGE) {
      return message.substr(0, 60) + '...';
    }
    return message;
  }

  public handleError(error: Error): void {
    this._notifierService.snackBar(
      'Error',
      ErrorsService.transformMessage(error.message)
    );
  }
}
