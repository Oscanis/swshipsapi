import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShipsModule } from './ships/ships.module';

//a TypeORM config ki lett rakva a project root /ormconfig.ts fájlba, így a forRoot automatikusan azt nyitja meg
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ShipsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
