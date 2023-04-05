import axios, { AxiosInstance } from 'axios';
import { z } from 'zod';

export type FetchOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  baseUrl?: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: Record<string, string>;
  auth?: Record<string, string>;
};

type FetchMapType = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  params?: z.ZodSchema<any>;
  body?: z.ZodSchema<any>;
};

export type FetchServiceType = {
  [key: string]: FetchMapType;
};

export class FetchService {
  private axios: AxiosInstance;

  constructor() {
    this.__init();
  }

  async fetch(options: FetchOptions) {
    const method = options.method;
    const headers = {
      ...(options.headers || {}),
      ...(options.auth || {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      }),
    };
    const params = options.params || {};
    const body = options.body || {};
    options.baseUrl = options.baseUrl || process.env.API_URL!;

    const url = (
      options.baseUrl.replace(/\/$/, '') +
      '/' +
      options.url.replace(/^\//, '')
    ).replace(/:(\w+)/g, (match, key) => {
      const value = params[key];
      delete params[key];
      return value;
    });

    if (method === 'GET') {
      return await this.axios.get(url, { headers, params });
    } else if (method === 'POST') {
      return await this.axios.post(url, body, { headers, params });
    } else if (method === 'PUT') {
      return await this.axios.put(url, body, { headers, params });
    } else if (method === 'PATCH') {
      return await this.axios.patch(url, body, { headers, params });
    } else if (method === 'DELETE') {
      return await this.axios.delete(url, { headers, params });
    }
  }

  private __init(): void {
    if (!this.axios) {
      this.axios = axios.create();

      this.axios.interceptors.request.use(
        (config) => {
          return config;
        },
        (error) => {
          return Promise.reject(error);
        },
      );

      this.axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          return Promise.reject(error);
        },
      );
    }
  }
}
