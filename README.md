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

>Client:
>>Client configurations are set in /restaurant/client/src/environments  
### Database ###

>This repo uses **MySQL**  
>Please set database configuration in restaurants/server/ormconfig.json  
>>Make sure that **host**, **port**, **username**, **password** and **database** are set.


### How do I run this repo? ###

>After setting all configurations, we can use start.sh to start this application.  
>Back to this repo's root directory
```
$ chmod +x start.sh
$ ./start.sh
```