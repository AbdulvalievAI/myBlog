import { IEnvironment } from '../interfaces/environment.interface';
import { NewsApiService } from '../services/news-api/news-api.service';

export const environment: IEnvironment = {
  typeENV: 'prod',
  production: true,
  sourceData: NewsApiService,
  api: {
    url: 'https://newsapi.org/v2/',
    key: '44caf8fd958444179e57d926c439f559',
  },
};
