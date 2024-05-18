
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

## For reviewers

Thanks for reviewing this code! 😊

I adapted the boiler plate provided and refactored it into a NestJS application. I really like this framework because it has great out-of-the-box features for a lot of really important application functionality. I tried to focus on making the application robust, clean and extensible. One of my goals was for the next dev(s) who look at the code to be able to understand, maintain and expand it easily.

This web application has some cool features:
- Full dependancy injection with class-based controllers and services
- Global request logging including error response logging (just to console for now)
- Complete pre-controller parameter validation
- Linting and formatting policy defined and enforced
- 100% e2e test coverage (no unit tests for now)
- Exhaustive OpenAPI documentation (see below)

Some possible next steps for the application could be:
- Implement full suite of unit tests
- Paginate the get users response (unsafe to respond full DB collection contents)
- Impelement additional user functionality (eg. update, delete, bulk create)
- Implement additional platform functionality (eg. authentication)
- Flesh out the monitoring (persist application logs and errors or pipe them to a service)

As a last note, one of the choices I made was to implement UUIDs for the user objects instead of using the DB default ObjectIDs (or sequential IDs). In my experience, this is best practice. 

## Installation

```bash
$ npm install
```

## Running the app

( ! ) Ensure you have MongDB runing locally before sarting the app.

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
```

## Documentation

When you run the app in `dev` mode, the documentation is automatically generated and served at `http://localhost:<PORT>/api`. Simply navigate to this URL in your browser to view the API documentation.

## License

This app is UNLICENSED.
