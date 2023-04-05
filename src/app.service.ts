import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<any> {
    return await api.event;
  }
}
