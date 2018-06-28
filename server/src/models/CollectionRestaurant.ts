import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, Column } from "typeorm";
import { Restaurant } from "./Restaurant";
import { Collection } from "./Collection";

@Entity()
export class CollectionRestaurant{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @ManyToOne(type => Restaurant)
    restaurant: Restaurant;

    @ManyToOne(type => Collection, collection => collection.collectionRestaurants, {onDelete: 'CASCADE'})
    collection: Collection;
}