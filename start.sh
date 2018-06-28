#!/bin/bash
cd client
echo "Building angular..."
ng build --prod
cp dist ../server/src
cd ../server
cd server
NODE_ENV=prod npm start