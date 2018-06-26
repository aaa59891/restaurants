import fs = require('fs');
import readline = require('readline');
import { Restaurant } from '../models/Restaurant';
import { OpeningHours } from '../models/OpeningHours';
import * as _ from 'lodash';
export class InitRestaurant{
    constructor(private filePath: string){}
    private dayMap = {
        'Mon': 1,
        'Tue': 2,
        'Wed': 3,
        'Thu': 4,
        'Fri': 5,
        'Sat': 6,
        'Sun': 7,
    }
    readRestaurants(cb:(restaurant: Restaurant) => void){
        const inputStream = fs.createReadStream(this.filePath);
        const reader = readline.createInterface({input: inputStream});
        reader
            .on('line', (data) => {
                cb(this.getRestaurant(data));
            });

    }

    private getRestaurant(data: string){
        const index = data.indexOf(',');
        let restaurant = new Restaurant();
        restaurant.name = data.slice(0, index).replace(/"/g, '');
        restaurant.openingHours = this.getOpeningHours(data.slice(index + 1).replace(/"/g, ''));
        return restaurant;
    }

    private getOpeningHours(data: string){
        return data.split(' / ')
            .reduce((pre, cur) => {
                const i = cur.search(/\d/);
                const day = cur.slice(0, i);
                const time = cur.slice(i).split('-');
                const openTime = this.parseTime(time[0].trim());
                const closeTime = this.parseTime(time[1].trim());
                return pre.concat(...this.getDays(day).map((d) => {
                    const oh = new OpeningHours();
                    oh.day = d;
                    oh.openTime = openTime;
                    oh.closeTime = closeTime;
                    return oh;
                }))
            }, []);
    }

    private getDays(data: string): number[]{
        return data.split(',').reduce((pre, cur) => {
            const raw = cur.split('-');
            if(raw.length === 1){
                return pre.concat(this.dayMap[raw[0].trim()]);
            }
            return pre.concat(..._.range(this.dayMap[raw[0].trim()], this.dayMap[raw[1].trim()] + 1));
        }, []);
    }

    private parseTime(data: string){
        const raw = data.split(' ');
        const time = raw[0].trim().split(':');
        let hour = parseInt(time[0]) === 12? 0: parseInt(time[0]);
        if(raw[1].indexOf('pm') !== -1){
            hour += 12;
        }
        let result = `${hour}:00`;
        if(time.length > 1){
            result = `${hour}:${time[1]}`;
        }
        return result;
    }
}