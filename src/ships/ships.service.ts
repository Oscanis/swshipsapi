import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { Ship } from './entities/ship.entity';

//fake db json fájl, hogy működjön, a tsconfig.json-hoz hozzá kell adni a "resolveJsonModule": true" opciót
import * as fakedb from '../fake-db.json';

@Injectable()
export class ShipsService {

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
    return `This function is not yet implemented`;
  }

  remove(id: number) {
    return `This function is not yet implemented`;
  }
}
