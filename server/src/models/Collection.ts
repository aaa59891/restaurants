import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { CollectionRestaurant } from "./CollectionRestaurant";

@Entity()
export class Collection{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, unique: true})
    name: string;

    @ManyToOne(type => User, user => user.collections)
    user: User;

    @OneToMany(type => CollectionRestaurant, cr => cr.collection)
    collectionRestaurants: CollectionRestaurant[];
}