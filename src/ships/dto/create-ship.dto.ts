import { ApiProperty } from "@nestjs/swagger";

export class CreateShipDto {
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
