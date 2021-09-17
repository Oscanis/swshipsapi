import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Star Wars Ships Nest.js API. Swagger elérhető a /swagger útvonalon';
  }
}
