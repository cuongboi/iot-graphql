import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import './fetch/fetch.proxy';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any> {
    const data = await api.event.getAll({
      organization_id: 'ab2f9ce2-d148-4fdd-9064-6e1602479a49',
    });
    return await data.data;
  }
}
