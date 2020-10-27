import { DialogsEnum } from '../enums/dialogs.enum';

/** Формат даты в ответе при закрытии диалогового окна */
export interface IDialogCloseResponse {
  openDialog?: keyof typeof DialogsEnum;
}
