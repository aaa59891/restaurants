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
import { AuthorizationMiddleware } from "./middlewares/AuthorizationMiddleware";

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
    const prefix = '/api';

    app.post(prefix + "/signup", userController.signUp.bind(userController));
    app.post(prefix + "/signin", userController.signIn.bind(userController));
    
    
    app.get(prefix + "/collection_restaurant_list/:id", crController.getCollRestaurants.bind(crController));
    
    app.get(prefix + "/restaurants", restaurantController.getRestaurants.bind(restaurantController));
    
    app.post(prefix + "/mailToFriend", mailController.sendEmailToFriend.bind(mailController));
    

    {
        app.post(prefix + "/collection", AuthorizationMiddleware.checkJwt, collectionController.addCollection.bind(collectionController));
        app.get(prefix + "/collection", AuthorizationMiddleware.checkJwt, collectionController.getCollection.bind(collectionController))
        app.delete(prefix + "/collection/:id", AuthorizationMiddleware.checkJwt, collectionController.deleteCollection.bind(collectionController));
        app.put(prefix + '/collection', AuthorizationMiddleware.checkJwt, collectionController.updateName.bind(collectionController));
    
        app.post(prefix + "/collection_restaurant", AuthorizationMiddleware.checkJwt, crController.addCollRestaurant.bind(crController));
        app.delete(prefix + "/collection_restaurant/:id", AuthorizationMiddleware.checkJwt, crController.deleteCr.bind(crController));
        app.put(prefix + "/collection_restaurant", AuthorizationMiddleware.checkJwt, crController.updateCr.bind(crController));
    }

}