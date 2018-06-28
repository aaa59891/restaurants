# README #

This README would normally document whatever steps are necessary to get your application up and running.

### How do I get set up? ###
   ```
   $ git clone https://github.com/aaa59891/restaurants.git  
   $ cd restaurants  
   $ chmod +x init.sh   
   $ ./init.sh
   ```
### Configuration setting: ###
>Server:
>>You can find configuration file at /restaurant/server/src/conf/config.ts  
>>defaultConfig can be used for development, prodConfig is used for production.  
>>There is a test email account for this repo, you can just use or change it to your email account.  
>>Remember to set the url which is this application's url, that will appear in the email you send to your friends.  

>Client:
>>Client configurations are set in /restaurant/client/src/environments  
### Database ###

>This repo uses **MySQL**  
>Please set database configuration in restaurants/server/ormconfig.json  
>>Make sure that **host**, **port**, **username**, **password** and **database** are set.


### How do I run this repo? ###
>Production:
```
$ chmod +x start.sh
$ ./start.sh
```
>>Server only:
```
$ cd restaurant
$ NODE_ENV=prod npm start
```
>>Client only:
```
$ cd client
$ npm run build
$ cp -r dist ../server/src
```
>Development:
>>Remember to set the client's configuration  
>>
>>Run two servers(angular & express)
>>
>>Angular:
```
$ cd client
$ npm start
```
>>Express:
```
$ cd server
$ NODE_ENV=dev npm start
```