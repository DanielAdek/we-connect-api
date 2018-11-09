# biz-connect
Get business around you

[![Build Status](https://travis-ci.org/DanielAdek/biz-connect.svg?branch=develop)](https://travis-ci.org/DanielAdek/biz-connect) [![Maintainability](https://api.codeclimate.com/v1/badges/5ee95a9ac9154da378f8/maintainability)](https://codeclimate.com/github/DanielAdek/biz-connect/maintainability) [![Coverage Status](https://coveralls.io/repos/github/DanielAdek/biz-connect/badge.svg?branch=develop)](https://coveralls.io/github/DanielAdek/biz-connect?branch=develop)


## Table of Contents

 * [Technologies](#technologies)
 * [Features](#features)
 * [Api-endpoints](#api-endpoints)
 * [Getting Started](#getting-started)
    * [Installation](#installation)
    * [Testing](#testing)
    * [Development](#development)
    
    

### Pivotal Tracker
Project is currently being built with the Project Management Tool, Pivotal Tracker.
You can find the template at [https://www.pivotaltracker.com/n/projects/2223778](https://www.pivotaltracker.com/n/projects/2223778)


### API Deployment
API is deployed at [https://biz-connect.herokuapp.com](https://biz-connect.herokuapp.com/)

***You can test endpoints with the following routes listed on the [table](#api-endpoints) provided below:***

## Technologies

* [NodeJS](https://nodejs.org/) - Runtime Environment
* [ExpressJs](https://expressjs.com/) - Web Application Framework
* [PostgreSql](https://www.postgresql.org/) - Database Management Tool

### Style Guide Tool

#### Linter

* [ESLint](https://eslint.org/) - Linter Tool

#### Compiler

* [Babel](https://babeljs.io/) - Compiler for Next Generation JavaScript

#### Test Tools

* [Mocha](https://mochajs.org/) - JavaScript Test Framework for API Tests
* [Chai](http://chaijs.com/) - TDD/BDD Assertion Library for Node
  library for testing node.js HTTP servers
* [nyc](https://istanbul.js.org/) - Code Coverage Generator

## Features

* Create Business
* Update Business
* Delete Business
* Modify Business
* Create API Client
* Delete API Client
* Get All API Client
* Get All Businesses/Category

## Getting Started

### Installation

* git clone [Biz-connect Repository](https://github.com/DanielAdek/biz-connect) 
* Run `npm install` to install packages
* Run `npm run start:dev` to start the server
* Navigate to [localhost:8000](http://localhost:3000/App/src/markup/index.html) in browser to test APIs endpoint

### Testing

#### Prequisites

* You should have [Postman](https://getpostman.com/) installed

#### Testing with Postman

* After installing as shown above
* Navigate to [localhost:8000/api/v1](http://localhost:3000/api/v1) on [Postman](https://getpostman.com/).
#### Testing with Coverage Data

* After installing as shown 

* Run `npm run test:dev` to run test locally

### Development
You can run `npm run start:dev` in development to use [Nodemon](https://nodemon.io/)

[Nodemon](https://nodemon.io/) watches for file changes and restarts your code. 

## Api-endpoints


##### Open the postman and test the following existing routes
***Note:*** You have to sign up or log in to perfom operations.

<table>
    <tr>
        <th>API</th>
        <th>HTTP verb</th>
        <th>Action</th>
    </tr>
     <tr>
        <td>/api/v1/auth/signup</td>
        <td>POST</td>
        <td>Create an account</td>
    </tr>
     <tr>
        <td>/api/v1/auth/login</td>
        <td>POST</td>
        <td>Login to your account</td>
    </tr>
     <tr>
        <td>/api/v1/auth/users</td>
        <td>POST</td>
        <td>Retrieve all users</td>
    </tr>
     <tr>
        <td>/api/v1/auth/del/user/{userId}</td>
        <td>POST</td>
        <td>Close account</td>
    </tr>
    <tr>
        <td>/api/v1/business/register</td>
        <td>POST</td>
        <td>Create new business</td>
    </tr>
    <tr>
        <td>/api/v1/business/{businessId}</td>
        <td>PUT</td>
        <td>Update a business</td>
    </tr>
    <tr>
        <td>/api/v1/business{businessId}</td>
        <td>DELETE</td>
        <td>Delete a business</td>
    </tr>
    <tr>
        <td>/api/v1/businesses</td>
        <td>GET</td>
        <td>Get all businesses</td>
    </tr>
    <tr>
        <td>/api/v1/business?{categories}</td>
        <td>GET</td>
        <td>Get all business by category</td>
    </tr>
</table>