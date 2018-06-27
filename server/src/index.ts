import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {setRoutes} from "./routes";
import { InitRestaurant } from "./init/InitRestaurant";
import { join } from 'path';
import { ServiceProvider } from "./Provider";
import { RestaurantService } from "./services/RestaurantService";
import * as socket from 'socket.io';

createConnection().then(async _ => {
    // create express app
    const restaurantService: RestaurantService = ServiceProvider.getService(RestaurantService);
    const totalCount = await restaurantService.getTotalCount();
    if(totalCount === 0){
        new InitRestaurant(join(__dirname, 'init/hours.csv')).readRestaurants((restaurant) => {
            restaurantService.save(restaurant);
        });
    }
    const app = express();
    var http = require('http').Server(app);
    var io = socket(http);
    app.use(require('cors')());
    app.use(bodyParser.json());
    // register express routes from defined application routes
    setRoutes(app);

    // setup express app here
    // ...

    io.on('connect', (socket) => {
        console.log('socket connect');
    })
    // start express server
    http.listen(3000, () => {
        console.log("Express server has started on port 3000.");
    });

}).catch(error => console.log(error));
