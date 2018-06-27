import { Restaurant } from "./restaurant";

export class CollectionRestaurant{
    id: number;
    name: string;
    restaurant: Restaurant;
    collection: {id: number};
}