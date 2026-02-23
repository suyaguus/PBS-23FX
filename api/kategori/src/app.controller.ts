import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// @Controller('kategori')
// http://localhost:3001/api/kategori

@Controller()
// http://localhost:3001/api
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getWelcome();
  }
}
