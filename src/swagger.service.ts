import { Injectable, Scope, Inject } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import SwaggerApi from 'swagger-to-service';

@Injectable()
export class SwaggerService extends SwaggerApi {
  constructor() {
    const axiosInstance: AxiosInstance = axios.create({
      baseURL: process.env.API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.API_TOKEN
      },
    });

    super(axiosInstance);
  }
}