import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {setRoutes} from "./routes";

createConnection().then(async _ => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    // register express routes from defined application routes
    setRoutes(app);

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    console.log("Express server has started on port 3000.");

}).catch(error => console.log(error));
