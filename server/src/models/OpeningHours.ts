import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Restaurant } from "./Restaurant";

@Entity()
export class OpeningHours{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    day: number;

    @Column('time')
    openTime: string;
    
    @Column('time')
    closeTime: string;

    @ManyToOne(type => Restaurant, restaurant => restaurant.openingHours)
    restaurant: Restaurant;
}