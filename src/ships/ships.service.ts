import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { Ship } from './entities/ship.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//fake db json fájl, hogy működjön, a tsconfig.json-hoz hozzá kell adni a "resolveJsonModule": true" opciót
import * as fakedb from '../fake-db.json';

@Injectable()
export class ShipsService {

  // !!! FAKE JSON DB megoldás, vagy ezt a részt, vagy a Postgres részt ki kell kommentelni
  // valamint az app.module.ts-ből és a ships.module.ts-ből is a TypeOrmModule.forRoot és .forService részeket

  //fake DB teszteléshez, később ide jön az adatbázis kezelő réteg
  private ships: Ship[] = fakedb;

  create(createShipDto: CreateShipDto) {
    //egyszerűbb hozzáadni spread operatorral a teljes nuser DTO-t, így dinamikusan lehet bővíteni
    //az id sima increment
    const newShip = {id: this.ships.length+1, ...createShipDto}

    this.ships.push(newShip);

    return newShip;
  }

  //a name itt opcionális, ha üres akkor visszaad mindent, amúgy filterez
  findAll(name?: string) {
    if(name) {
      return this.ships.filter(ship => ship.name === name);
  }
  else return this.ships;
  }

  findOne(id: number) {
    const ship = this.ships.find(ship => ship.id === id);

        //ha nincs találat, dob egy Nest.js built-in exceptiont, itt 404 Not Found, de lehet akár Bad Request, stb.
        if(!ship) {
            throw new NotFoundException();
        }
        else return ship;
  }

  //az update és remove később implementálva lesz, a teszt funkcióhoz elég a findAll és findOne
  update(id: number, updateShipDto: UpdateShipDto) {
    let ship = this.findOne(id);
    ship = {id, ...updateShipDto};
    return ship;
  }

  remove(id: number) {
    const shipId = this.ships.findIndex((ship => ship.id == id));
    const removedShip = this.ships[shipId];
    this.ships.splice(shipId, 1);
    return removedShip;
  }

  // !!! FAKE JSON DB rész vége

/*
  // !!! POSTGRES megoldás, vagy ezt a részt, vagy a Fake Json Db részt ki kell kommentelni

  //a constructorban injektálunk/létrehozunk egy repository-t az entity alapján, ezzel tudunk adatbázisműveleteket végrehajtani
  constructor( @InjectRepository(Ship) private shipRepository: Repository<Ship>) {}

  //async megoldás a DB műveletekhez
  async findAll(): Promise<Ship[]> {
    const ships: Ship[] = await this.shipRepository.find(); //SELECT * from ship
    return ships;
  }

  async findOne(id: number): Promise<Ship> {
    // a findOne ha nem talál semmit, üresen tér vissza. A findOneOrFail visszadob egy hibaüzenetet, így try-catch blokkba jó
    try {
      const ship: Ship =  await this.shipRepository.findOneOrFail(id); // SELECT * from ship WHERE ship.id == id
      return ship;
    }
    catch (err) {
      throw err;
    }
  }

  async create(createShipDto: CreateShipDto): Promise<Ship> {
    //egyszerűbb hozzáadni spread operatorral a teljes nuser DTO-t, így dinamikusan lehet bővíteni
    const newShip = this.shipRepository.create(createShipDto);
    
    return this.shipRepository.save(newShip); //INSERT
  }

  async update(id: number, updateShipDto: UpdateShipDto): Promise<Ship> {
    let ship = await this.findOne(id);

    ship = {id, ...updateShipDto};

    return this.shipRepository.save(ship); //a save UPDATE-re is jó
  }

  async remove(id: number): Promise<Ship> {
    let ship = await this.findOne(id);
    return await this.shipRepository.remove(ship);
  }
*/
  //ezen kívül lehet építeni custom sql-hez hasonló query-ket a repository.createQueryBuilder-el, ezt majd tanulmányozni kell
}
