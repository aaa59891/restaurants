import {UserController} from "./controller/UserController";
import { Application } from 'express';
import { UserService } from "./services/UserService";
import { ServiceProvider } from "./Provider";



export function setRoutes(app: Application){
    const userController = new UserController(ServiceProvider.getService(UserService));
    const routes = [{
        method: "post",
        route: "/signup",
        controller: userController.signUp.bind(userController)
    },{
        method: "post",
        route: "/signin",
        controller: userController.signIn.bind(userController)
    }];


    for(let route of routes){
        app[route.method]('/api' + route.route, route.controller);
    }
}