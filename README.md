# simple-phonebook

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

Endpoint to add register a new user
- **<code>POST</code> api/v1/register**
*Payload*: RosterItem
*Return value*: HTTP status 201 (Created)

## Contributing

I am more than happy to accept contributions to the project. Contributions can be in the form of feedback, bug reports or even better - pull requests :)
