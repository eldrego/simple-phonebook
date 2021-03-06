# Simple-phonebook

[![Hound](https://img.shields.io/badge/Protected_by-Hound-a873d1.svg)](https://github.com/eldrego/simple-phonebook.git)

Simple Phonebook is a RESTful API for a phone book application. Data can be persisted to a mongoDB database. This application uses JWT Token as an authentication method to secure requests.

## Requirements
* node `8.9.0`
* npm `^6.0.1`
* mongodb `3.6.3`

## Installation

Download and install [MongoDB](https://www.mongodb.com/download-center#community)

Create a new MongoDB database. Retrieve your URI connection string. See examples [here](https://docs.mongodb.com/manual/reference/connection-string/#examples)
Create your .env file and populate the relevant values based on the sample file .env-sample

After confirming that your environment meets the above requirements, you can create a new project by doing the following:

```bash
$ git clone https://github.com/eldrego/simple-phonebook.git <my-project-name>
$ cd <my-project-name>
```

Then install dependencies

```bash
$ npm install
$ npm start                     # Compiles the server-side before the application launches
```
If everything works, you should get a message indicating so. In development Application will be served on port 8080
Open the web browser to http://localhost:9090/

While developing, leverage these additional scripts other than `npm start`;

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app for production at `localhost:9090`.|
|`dev`  |Serves your app for development at `localhost:9090`. Watching files using Nodemon|
|`test` |Runs unit tests with Mocha and generates a coverage report.|

## Project Structure

The project structure presented in this starter kit is outlined below. This structure is only meant to serve as a guide.

```
.
├── tests                    # All build-related server side code
└── src                      # Application source code
    ├── config               # Configurations folder (Database, Environment, etc.)
    ├── controllers          # Controllers for users and contacts in the phonebook
    ├── helpers              # Helper functions and utilities
    ├── middleware           # Middle-wares used on the routes
    ├── models               # Schema definition for Users and Contacts
    ├── routes               # Endpoints
    └── index.js             # Express application

```

## Endpoints


> <code>POST</code> /api/v1/register <code>200</code>
Endpoint to add register a new user

**Parameters**
- fullName
- email
- password

**Response**
```json
{
  "success": true,
  "message": "User successful created",
  "token": "JWT Token"
}
```

> <code>POST</code> /api/v1/login <code>200</code>
Endpoint to add login a user

**Parameters**
- email
- password

**Response**
```json
{
  "success": true,
  "message": "fullName, You have successfully logged in.",
  "token": "JWT Token"
}
```

> <code>POST</code> /api/v1/contact <code>201</code>
Endpoint to create new contact

**Parameters**
- firsName
- lastName
- phoneNumber

**Response**
```json
{
  "success": true,
  "message": "success",
  "contact": {
    "_id": "5c683559136bad26d8a19d73",
    "firstName": "firsName",
    "lastName": "lastName",
    "phoneNumber": "phoneNumber",
    "owner": "5c68150c5c9b0318e8d16731",
    "createdAt": "2019-02-16T16:07:53.241Z",
    "updatedAt": "2019-02-16T16:07:53.241Z",
    "__v": 0
  }
}
```

> <code>GET</code> /api/v1/contacts <code>200</code>
Endpoint to retrieve all contact

**Parameters**

**Response**
```json
{
  "success": true,
  "message": "success",
  "contact": {
    "_id": "5c683559136bad26d8a19d73",
    "firstName": "firsName",
    "lastName": "lastName",
    "phoneNumber": "phoneNumber",
    "owner": "5c68150c5c9b0318e8d16731",
    "createdAt": "2019-02-16T16:07:53.241Z",
    "updatedAt": "2019-02-16T16:07:53.241Z",
    "__v": 0
  }
}
```

> <code>GET</code> /api/v1/contact/:id <code>200</code>
Endpoint to retrieve one contact

**Parameters**

**Response**
```json
{
  "success": true,
  "message": "success",
  "contact": {
    "_id": "5c683559136bad26d8a19d73",
    "firstName": "firsName",
    "lastName": "lastName",
    "phoneNumber": "phoneNumber",
    "owner": "5c68150c5c9b0318e8d16731",
    "createdAt": "2019-02-16T16:07:53.241Z",
    "updatedAt": "2019-02-16T16:07:53.241Z",
    "__v": 0
  }
}
```

> <code>PUT</code> /api/v1/contact/:id <code>200</code>
Endpoint to update one contact

**Parameters** *Optional*
- firsName
- lastName
- phoneNumber

**Response**
```json
{
  "success": true,
  "message": "success",
  "contact": {
    "_id": "5c683559136bad26d8a19d73",
    "firstName": "NewfirsName",
    "lastName": "NewlastName",
    "phoneNumber": "NewphoneNumber",
    "owner": "5c68150c5c9b0318e8d16731",
    "createdAt": "2019-02-16T16:07:53.241Z",
    "updatedAt": "2019-02-16T16:07:53.241Z",
    "__v": 0
  }
}
```

> <code>DELETE</code> /api/v1/contact/:id <code>204</code>
Endpoint to update one contact

**Parameters**

**Response**
```json

```

## Contributing

I am more than happy to accept contributions to the project. Contributions can be in the form of feedback, bug reports or even better - pull requests :)
