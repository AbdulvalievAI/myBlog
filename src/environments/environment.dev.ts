import { IEnvironment } from '../interfaces/environment.interface';

export const environment: IEnvironment = {
  typeENV: 'dev',
  production: false,
  sourceData: 'local',
  // TODO убрать после другого TODO - переключение между сервисами - переделать на более красивое решение
  api: {
    url: 'https://newsapi.org/v2/',
    key: '44caf8fd958444179e57d926c439f559',
  },
};
