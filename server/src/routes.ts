import {UserController} from "./controller/UserController";
import { Application } from 'express';
import { UserService } from "./services/UserService";
import { ServiceProvider } from "./Provider";
import { CollectionService } from "./services/CollectionService";
import { CollcetionController } from "./controller/CollectionController";
import { CollectionRestaurantController } from "./controller/CollectionRestaurantController";
import { CollectionRestaurantService } from "./services/CollectionRestaurantService";
import { RestaurantController } from "./controller/RestaurantController";
import { RestaurantService } from "./services/RestaurantService";
import { MailController } from "./controller/MailController";
import { MailService } from "./services/MailService";
import { App } from "./App";

enum HttpMethod{
    POST = 'post',
    GET = 'get',
    PUT = 'put',
    DELETE = 'delete'
}

export function setRoutes(app: Application){
    const userController = new UserController(ServiceProvider.getService(UserService));
    const collectionController = new CollcetionController(ServiceProvider.getService(CollectionService));
    const crController = new CollectionRestaurantController(ServiceProvider.getService(CollectionRestaurantService));
    const restaurantController = new RestaurantController(ServiceProvider.getService(RestaurantService));
    const mailController = new MailController(ServiceProvider.getService(MailService));

    const routes = [{
        method: HttpMethod.POST,
        route: "/signup",
        controller: userController.signUp.bind(userController)
    },{
        method: HttpMethod.POST,
        route: "/signin",
        controller: userController.signIn.bind(userController)
    },{
        method: HttpMethod.POST,
        route: "/collection",
        controller: collectionController.addCollection.bind(collectionController)
    },{
        method: HttpMethod.GET,
        route: "/collection/:id", // TODO JWT later
        controller: collectionController.getCollection.bind(collectionController)
    },{
        method: HttpMethod.DELETE,
        route: "/collection/:id", 
        controller: collectionController.deleteCollection.bind(collectionController)
    },{
        method: HttpMethod.POST,
        route: "/collection_restaurant", 
        controller: crController.addCollRestaurant.bind(crController)
    },{
        method: HttpMethod.GET,
        route: "/collection_restaurant_list/:id", 
        controller: crController.getCollRestaurants.bind(crController)
    },{
        method: HttpMethod.DELETE,
        route: "/collection_restaurant/:id", 
        controller: crController.deleteCr.bind(crController)
    },{
        method: HttpMethod.PUT,
        route: "/collection_restaurant", 
        controller: crController.updateCr.bind(crController)
    },{
        method: HttpMethod.GET,
        route: "/restaurants", 
        controller: restaurantController.getRestaurants.bind(restaurantController)
    },{
        method: HttpMethod.POST,
        route: "/mailToFriend", 
        controller: mailController.sendEmailToFriend.bind(mailController)
    }];

    for(let route of routes){
        app[route.method]('/api' + route.route, route.controller);
    }
}