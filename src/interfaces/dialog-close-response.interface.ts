import { DialogEnum } from '../enums/dialog.enum';

/** Формат даты в ответе при закрытии диалогового окна */
export interface IDialogCloseResponse {
  openDialog?: keyof typeof DialogEnum;
  isResolution?: boolean;
}
