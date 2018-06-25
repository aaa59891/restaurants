import {UserController} from "./controller/UserController";
import { Application, Request, Response } from 'express';
import { NextFunction } from "connect";

export function setRoutes(app: Application){
    const userController = new UserController();
    const routes = [{
        method: "get",
        route: "/users",
        controller: userController.all.bind(userController)
    }, {
        method: "get",
        route: "/users/:id",
        controller: userController.one.bind(userController)
    }, {
        method: "post",
        route: "/users",
        controller: userController.save.bind(userController)
    }, {
        method: "delete",
        route: "/users",
        controller: userController.remove.bind(userController)
    }];


    for(let route of routes){
        app[route.method]('/api' + route.route, (req: Request, res: Response, next: NextFunction) => {
            const result = route.controller(req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    }
}