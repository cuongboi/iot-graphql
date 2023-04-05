import fetchMap from './fetch.map';
import { FetchMapProxy, FetchServiceType } from './fetch.types';
import { FetchService } from './fetch.service';

declare global {
  var api: FetchMapProxy<typeof fetchMap>;
}

const fetchService = new FetchService();

// @ts-ignore
global.api = new Proxy(fetchMap, {
  get: (targetMap, propMap) => {
    return new Proxy(targetMap[propMap], {
      get: (target, prop: keyof FetchServiceType): any => {
        return async (params: any, body: any) => {
          // @ts-ignore
          const { method, url } = target[prop];
          const options = {
            method,
            url,
            params,
            body,
          };

          return await fetchService.fetch(options);
        };
      },
    });
  },
}) as FetchMapProxy<typeof fetchMap>;
