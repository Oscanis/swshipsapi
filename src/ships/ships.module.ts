import { Module } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { ShipsController } from './ships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ship } from './entities/ship.entity';

//az adatbázis műveletekhez a TypeOrmModule.forFeature([])-t importáljuk, aminek a paramétere az entity (vagy entities)
@Module({
  //imports: [TypeOrmModule.forFeature([Ship])],
  controllers: [ShipsController],
  providers: [ShipsService]
})
export class ShipsModule {}
