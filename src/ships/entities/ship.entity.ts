import { ApiProperty } from "@nestjs/swagger";

export class Ship {
    //az ApiProperty Swagger beállítás, hogy megjelenjen schema-ként
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    model: string;
    @ApiProperty()
    manufacturer: string;
    @ApiProperty()
    cost_in_credits: string;
    @ApiProperty()
    length: string;
    @ApiProperty()
    max_atmosphering_speed: string;
    @ApiProperty()
    crew: string;
    @ApiProperty()
    passengers: string;
    @ApiProperty()
    cargo_capacity: string;
    @ApiProperty()
    consumables: string;
    @ApiProperty()
    hyperdrive_rating: string;
    @ApiProperty()
    MGLT: string;
    @ApiProperty()
    starship_class: string;
}