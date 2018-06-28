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

export class App{
    private app: express.Application;
    private restaurantService: RestaurantService;
    private http: any;
    static io: socket.Server;
    private isStart: boolean;
    constructor(){
    }
    
    async initServer(){
        if(this.isStart){
            return;
        }
        try {
            await this.initDatabase();
            this.restaurantService = ServiceProvider.getService(RestaurantService);
            const totalCount = await this.restaurantService.getTotalCount();
            if(totalCount === 0){
                this.initRestaurant();
            }

            this.app = express();

            this.http = require('http').Server(this.app);

            this.initSocket();
            if(process.env.NODE_ENV === 'dev'){
                this.app.use(require('cors')({origin: '*'}));
            }
            this.app.use(bodyParser.json());
            // register express routes from defined application routes
            setRoutes(this.app);

            if(process.env.NODE_ENV === 'prod'){
                this.app.use(express.static(join(__dirname, 'dist/client')));
                this.app.get('/*', (req, res, next) => {
                    res.sendFile(join(__dirname, 'dist/client/index.html'));
                });
            }

            // start express server
            this.http.listen(3000, () => {
                this.isStart = true;
                console.log("Express server has started on port 3000.");
            });
        } catch (error) {
            console.error(error);
        }
    }

    private async initDatabase(){
        return createConnection();
    }

    private initSocket(){
        App.io = socket(this.http);
        App.io.on('connect', (socket) => {
            socket.on('disconnect', function(){
            });
        })
    }

    private async initRestaurant(){
        new InitRestaurant(join(__dirname, 'init/hours.csv')).readRestaurants((restaurant) => {
            this.restaurantService.save(restaurant);
        });
    }

}