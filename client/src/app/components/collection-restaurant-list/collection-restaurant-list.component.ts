import { Component, OnInit, ViewChild } from "@angular/core";
import { CollectionService } from "../../services/collection.service";
import { Collection } from "../../models/collection";
import { DestroyHelper } from "../../shared/destroyHelper";
import { CollectionRestaurantService } from "../../services/collection-restaurant.service";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { SocketService } from "../../services/socket.service";
declare let $: any;

@Component({
    selector: "app-collection-restaurant-list",
    templateUrl: "./collection-restaurant-list.component.html",
    styleUrls: ["./collection-restaurant-list.component.css"]
})
export class CollectionRestaurantListComponent extends DestroyHelper implements OnInit {
    protected subscriptions = [];
    collections: Collection[] = [];
    @ViewChild('emailForm') emailForm: NgForm;
    constructor(
        public authService: AuthService,
        public collectionRestaurantService: CollectionRestaurantService,
        private socketService: SocketService,
        private collectionService: CollectionService
    ) {
        super();
    }

    ngOnInit() {
        this.subscriptions.push(
            this.socketService.addCollectionSub.subscribe(
                (col) => {
                    this.collections.push(col);
                }
            )
        )
        this.collectionService.getCollection().subscribe(
            (data: Collection[]) => this.collections = data
        );
    }

    onChangeCollection(collectionId: string){
        const id = parseInt(collectionId);
        this.collectionService.currentCollectionId =  id;
        this.collectionRestaurantService.getCollectionRestaurants(id);
    }

    onOpenModal(){
        $('#emailModal').modal('show');
    }

    onShareWithFriend(){
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
}
