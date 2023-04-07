import { Controller, Get } from '@nestjs/common';
import { SwaggerService } from './swagger.service';

@Controller()
export class AppController {
  constructor(private readonly swaggerService: SwaggerService) {}

  @Get()
  async getHello(): Promise<any> {
    const data = await this.swaggerService.searchOrgs({});

    return data
  }
}
