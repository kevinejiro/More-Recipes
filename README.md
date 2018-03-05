# More-Recipes
[![Build Status](https://travis-ci.org/kevinejiro/More-Recipes.svg?branch=develop)](https://travis-ci.org/kevinejiro/More-Recipes)
[![Maintainability](https://api.codeclimate.com/v1/badges/532c61aa499cfbc72d48/maintainability)](https://codeclimate.com/github/kevinejiro/More-Recipes/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/kevinejiro/More-Recipes/badge.svg?branch=develop)](https://coveralls.io/github/kevinejiro/More-Recipes?branch=develop)



# More Recipes

A platform for users to share their awesome and exciting recipes ideas with the world.

<br />
<br />

<img width="1440" alt="More-recipes-screenshot" src="">
<br />

# Table of Contents
- [Getting Started](#getting-started)
- [Technology Stack](#technology-stack)
  * [Dependencies](#dependencies)
- [Installation and Usage](#installation)
- [Testing](#testing)
- [Features](#features)
- [Models](#models)
- [Express Routes](#express-routes)
- [License](#license)
- [FAQ](#faqs)
- [Current state](#current-state)

## Getting Started
This is a javascript application built with [**Express**](https://expressjs.com/) framework on the nodejs platform. Authentication of users is done via [**JSON Web Tokens**](https://jwt.io/).


## Technology Stack
**UI & Templates**
1. HTML & CSS
2. bootstrap 4 CSS Framework
3. Javascript

**Server Side**
1. NodeJS
2. Express
3. Sequelize

**Client Side**
1. React(Redux)

### Dependencies
* Postgres
* Node


## Installation

1. Install [**Node JS**](https://nodejs.org/en/).
1. Install [**Postgres**](https://www.postgresql.org/) .
1. Clone the [**repository here**](https://github.com/kevinejiro/More-Recipes.git)
1. [**cd**] into the root of the **project directory**.
1. Run `npm install` on the terminal to install Dependecies
1. Install sequelize-cli, Create Postgresql database, Navigate to server directory and run migrations:
```
npm install -g seqeulize-cli
cd server
sequelize db:migrate
```
5. Create a `.env` file in the root directory of the application. Use a different database for your testing and development. Example of the content of a .env file is shown in the .env.sample

6. Start the application:
**_Different Build Environment_**

**Development**
```
npm run start:dev
npm run build
```

## Usage
- Run database migration with `npm start:migrate`
- Start app development with `npm run start` or `npm start`
- To start the client `npm run start:client`
- Install **Postman** and use to test all endpoints

## Testing

Sever side tests - Run `npm test` on the terminal while within the **project root directory**.
Client side tests - Run `npm run test:client` on the terminal while within the **project root directory**.

Server side testing is achieved through use of `chai-http`, `mocha` and `chai` packages. `chai-http` is used to make requests to the api and `mocha` is the testing framework and `chai` is the exception library. They will both be installed when you run `npm install` and the tests will run when you run `npm test`.

Client side testing is achieved through the use of `jest` package. `jest` is used to test javascript code in React applications.



## Features
More Recipes consists of the following features:

### Authentication

- It uses JSON Web Token (JWT) for authentication.
- Token is generated on user login or sign up


### Unauthenticated Users
- Unauthenticated users have access to the Top Recipes page

### Authenticated Users
- Authenticated Users can sign up
- Authenticated Users can sign in
- Authenticated Users can view all recipes in the application
- Authenticated Users can add and post a recipe
- Authenticated Users can favorite a recipe in the application
- Authenticated Users can delete a recipe they have created
- Authenticated Users can edit a recipe they created
- Authenticated Users can search for a recipe
- Authenticated Users can review recipes posted in the application
- Authenticated Users can show reaction to a posted recipe by upvoting or downvoting
- Authenticated Users can delete recipes thay have added to favorite


## Models

Five models are defined: `User`, `Recipe`,`Favorite`,`Review`, and `Vote`. `Recipe` must have a unique title on their creation. A `User` can create a `Recipe`. The routes are defined under `models/index`.


## Express Routes

Api endpoints were created using `express` router. The routes are defined under `server/routes`.  

### Questions
For more details contact ejiro.ogidigbo@andela.com

### Support or Contribution
For any suggestions or contributions  please do not hesistate to contact me

Contributions to this project are welcomed by all, If you need to contribute to this project, follow the steps below
* **Fork** the repository
* Follow [Installation and Setup](#installation-and-setup) as explained earlier
* Create a branch off **development** for the feature you wish to add
* Make neccessary changes, commit and raise a pull request against develop, conventions can be found on the wiki page
**Note** when making contributions, please endevour to follow the [Airbnb](https://github.com/airbnb/javascript) javascript style guide. check out the [wiki page](https://github.com/kevinejiro/More-Recipes/wiki)

## License
This project is authored by **Ejiro Ogidigbo** (ejiro.ogidigbo@andela.com) and is licensed for your use, modification and distribution under the **MIT** license.
[MIT][license] © [ejiro-ogidigbo][author]
<!-- Definitions -->
[license]: LICENSE
[author]: ejiro-ogidigbo

## FAQ
See the More Recipes wiki

## Current state

