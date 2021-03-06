import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { CollectionRestaurant } from "./CollectionRestaurant";

@Entity()
export class Collection{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @ManyToOne(type => User, user => user.collections)
    user: User;

    @OneToMany(type => CollectionRestaurant, cr => cr.collection, {onDelete: 'CASCADE'})
    collectionRestaurants: CollectionRestaurant[];
}