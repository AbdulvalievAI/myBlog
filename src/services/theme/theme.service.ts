import { Injectable } from '@angular/core';
import { ITheme } from '../../interfaces/theme.interface';
import { Themes } from '../../configs/theme.config';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
/** Сервис для работы с темами */
export class ThemeService {
  private _activeThemeId: ITheme['id'];
  private _defaultTheme: ITheme['id'] = 'indigoTheme';

  constructor(localStorageService: LocalStorageService) {
    const localStorageThemeId = localStorageService.getTheme();
    this.applyTheme(localStorageThemeId || this._defaultTheme);
  }

  /** Применяет тему к приложению */
  public applyTheme(themeId: ITheme['id']): void {
    if (themeId === this._activeThemeId) {
      return;
    }
    if (this._activeThemeId) {
      document.body.classList.remove(
        Themes.find((theme) => theme.id === this._activeThemeId).value
      );
    }
    this._activeThemeId = themeId;
    document.body.classList.add(
      Themes.find((theme) => theme.id === themeId).value
    );
  }

  /** Получение списка тем */
  public getThemes(): Array<ITheme> {
    return Themes;
  }
}
