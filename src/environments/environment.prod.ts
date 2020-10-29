import { IEnvironment } from '../interfaces/environment.interface';

export const environment: IEnvironment = {
  typeENV: 'prod',
  production: true,
  sourceData: 'api',
  api: {
    url: 'https://newsapi.org/v2/',
    key: '44caf8fd958444179e57d926c439f559',
  },
};
