import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany} from "typeorm";
import { Collection } from "./Collection";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    email: string;

    @Column({length: 64})
    password: string;

    @OneToMany(type => Collection, collection => collection.user)
    collections: Collection[];
}
