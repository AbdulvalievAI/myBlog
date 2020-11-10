import { ITheme } from './theme.interface';

export interface IThemeLocalStorage {
  id: ITheme['id'];
  isDark: boolean;
  isContrast: boolean;
}
