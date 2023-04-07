import { Injectable, Scope, Inject } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import SwaggerApi from 'swagger-to-service';

@Injectable()
export class SwaggerService extends SwaggerApi {
  constructor(options?: Partial<AxiosRequestConfig>) {
    const axiosInstance: AxiosInstance = axios.create({
      baseURL: process.env.API_URL,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.API_TOKEN, 
        ...options?.headers,
      },
    });

    super(axiosInstance);
  }
}