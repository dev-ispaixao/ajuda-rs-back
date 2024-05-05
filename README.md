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

## Deploy
1) Instalar o PM2 globalmente
```yarn global add pm2```
2) Rodar o script de deploy:
```yarn deploy```
3) Configurar restart automático da aplicação caso o servidor fique offline e retorne:
```pm2 startup```

Comandos PM2 CLI úteis para monitoramento e gerenciamento da aplicação:

pm2 list: Lista todos os processos gerenciados pelo PM2.

pm2 stop sosrs-api : Para a app.

pm2 restart sosrs-api : Reinicia a app.

pm2 delete sosrs-api : Remove a app do PM2.

## Routes
### Criação de requisição de ajuda
```
POST baseApi/request

Request
{
  "fullName": "string",
  "phone": "string",
  "address": "string",
  "need": "string",
  "document": "string"
}

Response
{
  "data": [
    {
      "_id": "string",
      "fullName": "string",
      "phone": "string",
      "address": "string",
      "need": "string",
      "document": "string",
      "status": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "__v": 0
    }
  ]
}
```

### Consulta de requisições de ajuda
```
GET baseApi/requests

Response
{
  "data": [
    {
      "_id": "string",
      "fullName": "string",
      "phone": "string",
      "address": "string",
      "need": "string",
      "document": "string",
      "status": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "__v": 0
    }
  ]
}
```
### Finalização de requisição de ajuda
```
PATCH baseApi/request/finish

Request
{
  "document": "string
}

Response
{
  "data": [
    {
      "_id": "string",
      "fullName": "string",
      "phone": "string",
      "address": "string",
      "need": "string",
      "document": "string",
      "status": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "__v": 0
    }
  ]
}
```

### Consulta de abrigos
```
GET baseApi/shelters

Response
{
  "data": [
    {
      "id": "string",
      "nome": "string",
      "latitude": "number",
      "estrutura_pessoas": "string",
      "roupa_cama": "string",
      "update_in": {
        "seconds": "number",
        "nanoseconds": "number"
      },
      "create_in": {
        "seconds": "number",
        "nanoseconds": "number"
      },
      "vagas_ocupadas": "string",
      "longitude": "number",
      "nome_contato": "string",
      "ext_getLatLongStatus": {
        "status": "string"
      },
      "demanda": "string",
      "telefone": "string",
      "pmpa": "string",
      "address": "string",
      "banheiros": "string",
      "vagas": "string",
      "cozinha": "string"
    }
  ]
}
```

### Consulta de abrigo
```
GET baseApi/shelter/:id

Response
{
  "data": {
    "id": "string",
    "address": "string",
    "phone": "string",
    "name": "string",
    "needs": "string",
    "vacancy": "number"
  }
}
```