
> // From the assignment description
> ## Backend Engineer Work Sample
>
>This project skeleton contains a basic Express setup one endpoint to create a user and one endpoint to fetch all users, as well as a basic empty unit test.
>
>`npm start` starts the server
>
>`npm test` executes the tests
>
>## Goal
>1. Adjust POST /users that it accepts a user and stores it in a database.
    * The user should have a unique id, a name, a unique email address and a creation date
>2. Adjust GET /users that it returns (all) users from the database.
    * This endpoint should be able to receive a query parameter `created` which sorts users by creation date ascending or descending.
>
>Feel free to add or change this project as you like.

# Perspective User Web Application Work Sample

## Description

A small web application for interacting with users.

Author: Dahv Reinhart

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

This app is UNLICENSED.
