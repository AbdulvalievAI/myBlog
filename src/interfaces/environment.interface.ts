/** Формат данных для настроек environment */
export interface IEnvironment {
  typeENV: string;
  production: boolean;
  sourceData: 'local' | 'api';
  api?: {
    url: string;
    key: string;
  };
}
