import type { z } from 'zod';
import fetchMap from './fetch.map';

export type FetchType = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  params?: z.ZodSchema;
  body?: z.ZodSchema;
  response?: z.ZodSchema;
};

export type FetchServiceType = {
  [key: string | symbol]: FetchType;
};

export type FetchMapType = {
  [key: string | symbol]: FetchServiceType;
};

export type FetchOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  baseUrl?: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: Record<string, string>;
  auth?: Record<string, string>;
};

type PickProperty<T extends FetchType, K extends keyof T> =
  | z.infer<Pick<T, K> | any>
  | undefined;

// export type FetchServiceInterface<T extends keyof typeof fetchMap> = {
//   [key in keyof typeof fetchMap[T]]: (
//     params?: PickProperty<typeof fetchMap[T][key], 'params'>,
//     body?: PickProperty<typeof fetchMap[T][key], 'body'>,
//   ) => Promise<PickProperty<typeof fetchMap[T][key], 'response'>>;
// };

export type FetchMapProxy<T extends typeof fetchMap> = {
  [key in keyof T]: {
    [key in keyof T[key]]: (
      params?: PickProperty<T[key][key], 'params'>,
      body?: PickProperty<T[key][key], 'body'>,
    ) => Promise<PickProperty<T[key][key], 'response'>>;
  };
};
