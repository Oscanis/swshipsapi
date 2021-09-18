import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//az Entity decorator adja meg, hogy ez az entity egy data table az adatbázisban
@Entity()
export class Ship {
    //a @PrimaryGeneratedColumn decorator adja meg az adattáblában azt, hogy primary key és auto-generált
    //az ApiProperty Swagger beállítás, hogy megjelenjen schema-ként
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    //a @Column decorator mondja meg, hogy a property egy column a táblában
    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    model: string;

    @Column()
    @ApiProperty()
    manufacturer: string;

    @Column()
    @ApiProperty()
    cost_in_credits: string;

    @Column()
    @ApiProperty()
    length: string;

    @Column()
    @ApiProperty()
    max_atmosphering_speed: string;

    @Column()
    @ApiProperty()
    crew: string;

    @Column()
    @ApiProperty()
    passengers: string;

    @Column()
    @ApiProperty()
    cargo_capacity: string;

    @Column()
    @ApiProperty()
    consumables: string;

    @Column()
    @ApiProperty()
    hyperdrive_rating: string;

    @Column()
    @ApiProperty()
    MGLT: string;

    @Column()
    @ApiProperty()
    starship_class: string;
}