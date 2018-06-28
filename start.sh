#!/bin/bash
cd client
echo "Building angular..."
npm run build
cp -r dist ../server/src
cd ../server
cd server
NODE_ENV=prod npm start