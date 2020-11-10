import { Injectable } from '@angular/core';
import { ITheme } from '../../interfaces/theme.interface';
import { Themes } from '../../configs/theme.config';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { IThemeLocalStorage } from '../../interfaces/theme-local-storage.interface';

@Injectable({
  providedIn: 'root',
})
/** Сервис для работы с темами */
export class ThemeService {
  constructor(private _localStorageService: LocalStorageService) {
    const localStorageTheme = this.getActiveTheme();
    this.applyTheme(
      localStorageTheme?.id || this._defaultTheme,
      localStorageTheme?.isDark,
      localStorageTheme?.isContrast
    );
  }
  private _defaultTheme: ITheme['id'] = this.getThemes()[0].value;

  /** Возвращает сгенерированное имя темы на основе переданных параметорв */
  private static generateThemeName(
    value: ITheme['value'],
    isDark = false,
    isContrast = false
  ): string {
    let result = `theme-${value}`;
    result += isDark ? '-dark' : '-light';

    if (isContrast) {
      result += '-contrast';
    }
    return result;
  }

  /** Применяет тему к приложению */
  public applyTheme(
    themeId: ITheme['id'],
    isDark = false,
    isContrast = false
  ): void {
    const activeTheme = this.getActiveTheme();

    if (activeTheme?.id) {
      document.body.classList.remove(
        ThemeService.generateThemeName(
          activeTheme.id,
          activeTheme.isDark,
          activeTheme.isContrast
        )
      );
    }
    this.saveInfo(themeId, isDark, isContrast);
    const valueTheme = this.getThemes().find((theme) => theme.id === themeId)
      .value;
    document.body.classList.add(
      ThemeService.generateThemeName(valueTheme, isDark, isContrast)
    );
  }

  /** Сохраняет настройки темы в local storage */
  private saveInfo(
    themeId: ITheme['id'],
    isDark: boolean,
    isContrast: boolean
  ): void {
    this._localStorageService.saveTheme(themeId, isDark, isContrast);
  }

  /** Получение списка тем */
  public getThemes(): Array<ITheme> {
    return Themes;
  }

  /** Получение активной в данный момент темы */
  public getActiveTheme(): IThemeLocalStorage {
    return this._localStorageService.getTheme();
  }
}
