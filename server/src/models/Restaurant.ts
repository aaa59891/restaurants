import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OpeningHours } from "./OpeningHours";

@Entity()
export class Restaurant{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @OneToMany(type => OpeningHours, openingHours => openingHours.restaurant, {cascade: true})
    openingHours: OpeningHours[];
}