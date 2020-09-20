# Plant Inventory System

This application contains api that can be consumed. The application contains capabilities such as `get` `getById` `create` `update` `delete` for the plant inventory.

## Tech Stack:

Nodejs v10.18.0 \
Express \
Docker \
Dynamodb

## Get Started

Clone the repository and run `npm run build` and `npm start` 
Or `npm run watch` for development purposes

## Running in Docker Container

The application can be dockarized and deployed

Build Docker container: `docker build -t jushita-rahman/plant-inventory-system-api . `
Run Docker Container `docker run -p "3000:3000" --env-file .env -d jushita-rahman/plant-inventory-system-api`
