/** Формат даты в ответе при закрытии диалогового окна */
export interface IDialogCloseResponse {
  // TODO Заменить на ENUM
  open?: 'login-form-dialog' | 'registration-form-dialog';
}
