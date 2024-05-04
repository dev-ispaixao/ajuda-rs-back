# Node Rest API

This project is a REST API with Node.js and Express.

## Prerequisites
- Node.js 10+
- Yarn or NPM

## Installation
- Install dependencies
```bash
yarn install
```
- Create local environment file
```shell
cp .env.example .env
nano .env
```
- Start Application
```bash
yarn start
```
The application will be launched by [Nodemon](https://nodemon.com) so it's will restart automatically on file change

## Routes
### Criação de requisição de ajuda
```
POST baseApi/request
{
  "fullName": "string",
  "phone": "string",
  "address": "string",
  "need": "string",
  "document": "string"
}
```
 
### Consulta de requisições de ajuda
```
GET baseApi/requests
{
  "data": [
    {
      "_id": "string",
      "fullName": "string",
      "phone": "string",
      "address": "string",
      "need": "string",
      "document": "string",
      "__v": 0
    }
  ]
}
```
