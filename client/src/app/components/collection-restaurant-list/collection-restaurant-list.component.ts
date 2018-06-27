import { Component, OnInit, ViewChild } from "@angular/core";
import { CollectionService } from "../../services/collection.service";
import { Collection } from "../../models/collection";
import { AutoUnsubscribe } from "../../shared/autoUnsubscribe";
import { CollectionRestaurantService } from "../../services/collection-restaurant.service";
import { CollectionRestaurant } from "../../models/collectionRestaurant";
import { NgForm } from "@angular/forms";
declare let $: any;

@Component({
    selector: "app-collection-restaurant-list",
    templateUrl: "./collection-restaurant-list.component.html",
    styleUrls: ["./collection-restaurant-list.component.css"]
})
export class CollectionRestaurantListComponent extends AutoUnsubscribe implements OnInit {
    protected subscriptions = [];
    collections: Collection[] = [];
    collectionRestaurants: CollectionRestaurant[] = [];
    @ViewChild('emailForm') emailForm: NgForm;
    constructor(
        private collectionService: CollectionService,
        private collectionRestaurantService: CollectionRestaurantService
    ) {
        super();
    }

    ngOnInit() {
        this.subscriptions.push(
            this.collectionService.collectionAddSub.subscribe(
                (col) => {
                    this.collections.push(col);
                }
            ),
            this.collectionRestaurantService.addCollectionRestaurantSub.subscribe(
                (restaurant) => this.collectionRestaurants.push(restaurant)
            ),
            this.collectionRestaurantService.deleteRestaurantSub.subscribe(
                (id) => {
                    this.collectionRestaurants = this.collectionRestaurants.filter((res) => res.id !== id);
                    this.sendCurrentRestaurantIds();
                }
            )
        )
        this.collectionService.getCollection().subscribe(
            (data: Collection[]) => this.collections = data
        );
    }

    onChangeCollection(collectionId: string){
        if(!collectionId){
            this.collectionRestaurants = [];
            this.collectionRestaurantService.currentRestaurantIdsSub.next([]);
            return;
        }
        const id = parseInt(collectionId);
        this.collectionService.currentCollectionId =  id;
        this.collectionRestaurantService.getCollectionRestaurants(id)
            .subscribe(
                (res: CollectionRestaurant[]) =>{
                    this.collectionRestaurants = res;
                    this.sendCurrentRestaurantIds();
                } 
            )
    }

    onOpenModal(){
        $('#emailModal').modal('show');
    }
    onSend(){
        $('body').css({cursor: 'progress'});
        this.collectionService.shareWithFriend(this.emailForm.value['email'])
            .subscribe(
                res => {
                    alert('Sent email successfully.');
                    $('body').css({cursor: 'auto'});
                    $('#emailModal').modal('hide');
                }
            )
    }

    private sendCurrentRestaurantIds(){
        this.collectionRestaurantService.currentRestaurantIdsSub.next(
            this.collectionRestaurants.map((res) => res.restaurant.id)
        );
    }
}
