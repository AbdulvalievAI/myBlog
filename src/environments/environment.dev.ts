import { IEnvironment } from '../interfaces/environment.interface';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

export const environment: IEnvironment = {
  typeENV: 'dev',
  production: false,
  sourceData: LocalStorageService,
};
