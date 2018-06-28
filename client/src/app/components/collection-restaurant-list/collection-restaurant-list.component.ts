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
    collectionId: number;
    newName: string;

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
            this.socketService.addCollectionSub.subscribe((col) => {
                this.collections.push(col);
            }),
            this.socketService.deleteCollectionSub.subscribe((id) => {
                this.collections = this.collections.filter((col) => col.id !== id);
                if(id === this.collectionId){
                    this.collectionId = 0;
                    this.onChangeCollection();
                }
            }),
            this.socketService.updateCollectionNameSub.subscribe((collection) => {
                this.collections.forEach((col) => {
                    if(col.id === collection.id){
                        col.name = collection.name;
                        return;
                    }
                })
            })
        )
        this.collectionService.getCollection().subscribe(
            (data: Collection[]) => this.collections = data
        );
    }

    onChangeCollection(){
        this.collectionService.currentCollectionId =  this.collectionId;
        this.collectionRestaurantService.getCollectionRestaurants(this.collectionId);
    }

    onOpenEmailModal(){
        $('#emailModal').modal('show');
    }

    onShareWithFriend(){
        $('body').css({cursor: 'progress'});
        this.collectionService.shareWithFriend(this.emailForm.value['email'])
            .subscribe(_ => {
                    alert('Sent email successfully.');
                    $('body').css({cursor: 'auto'});
                    $('#emailModal').modal('hide');
            })
    }

    onDeleteCollection(){
        if(confirm('Do you really want to delete this collection? ')){
            this.collectionService.deleteCollection(this.collectionId).subscribe();
        }
    }

    onOpenNameModal(){
        $('#nameModal').modal('show');
    }

    onUpdateCollectionName(){
        $('body').css({cursor: 'progress'});
        const collection = new Collection()
        collection.id = this.collectionId;
        collection.name = this.newName;
        this.collectionService.updateCollectionName(collection).subscribe((_) => {
            $('body').css({cursor: 'auto'});
            $('#nameModal').modal('hide');
        });
    }
}
