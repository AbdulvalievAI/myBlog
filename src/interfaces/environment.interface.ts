import { ISourceData } from './source-data.interface';
import { Type } from '@angular/core';

/** Формат данных для настроек environment */
export interface IEnvironment {
  typeENV: string;
  production: boolean;
  sourceData: Type<ISourceData>;
  api?: {
    url: string;
    key: string;
  };
}
