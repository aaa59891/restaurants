import {UserController} from "./controller/UserController";
import { Application } from 'express';
import { UserService } from "./services/UserService";
import { ServiceProvider } from "./Provider";
import { CollectionService } from "./services/CollectionService";
import { CollcetionController } from "./controller/CollectionController";

enum HttpMethod{
    POST = 'post',
    GET = 'get',
    PUT = 'put',
    DELETE = 'delete'
}

export function setRoutes(app: Application){

    const userController = new UserController(ServiceProvider.getService(UserService));
    const collectionController = new CollcetionController(ServiceProvider.getService(CollectionService));
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
    }];

    for(let route of routes){
        app[route.method]('/api' + route.route, route.controller);
    }
}