import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
//Service import
import { ShipsService } from './ships.service';
//DTO és Entity import
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { Ship } from './entities/ship.entity';
//import a Swagger dokumentációhoz
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';


//Swagger Api decorator, így a controllerben lévő összes call egy külön Users csoportban jelenik meg
@ApiTags('Ships')
//a Controllerben megadott string az API path, itt pl. localhost/users
@Controller('ships')
export class ShipsController {
  //service dependency injection
  constructor(private readonly shipsService: ShipsService) {}

  //az @ApiOkResponse Swagger beállítás, hogy a response type látszódjon:
  //az @ApiQuery decorator állítja be a http param-ot, és hogy opcionális
  //a @Get decorator mondja meg, milyen HTTP request esetén fusson le az alatta lévő függvény
  @ApiOkResponse({type: Ship, isArray: true})
  @ApiQuery({name: 'name', required: false})
  @Get()
  findAll(): Ship[] {
    return this.shipsService.findAll();
  }
  
  //subpath megadható a decoratorban, így a path itt localhost/users/:id
  //az input url paraméter mindig stringként jön.
  //Alapból cast-olva van, de lehet akár a ParseIntPipe: built-in Nest pipe-al transzformálni, ezt implementáltam
  //Az @ApiOK és @ApiNotfound Swagger doc beállítások
  @ApiOkResponse({type: Ship})
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Ship {
    return this.shipsService.findOne(id);
  }

  //A Post és lentebb a Patch a request body-t dolgozza fel, az @ApiCreated pedig a swagger dokumentációhoz
  @ApiCreatedResponse({type: Ship})
  @Post()
  create(@Body() createShipDto: CreateShipDto) {
    return this.shipsService.create(createShipDto);
  }

  @ApiOkResponse({type: Ship})
  @ApiNotFoundResponse()
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateShipDto: UpdateShipDto) {
    return this.shipsService.update(+id, updateShipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipsService.remove(+id);
  }
}
