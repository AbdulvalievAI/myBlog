// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnvironment } from '../interfaces/environment.interface';

export const environment: IEnvironment = {
  typeENV: 'default',
  production: true,
  sourceData: 'api',
  api: {
    url: 'https://newsapi.org/v2/',
    key: '44caf8fd958444179e57d926c439f559',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
