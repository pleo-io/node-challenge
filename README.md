# Node Challenge

Take home test for Node.js developers.

## The challenge

This challenge has been designed to measure your knowledge of Node.js, Express, Typescript and various technologies, like monorepos, databases and testing. For your exercise, you will be enhancing this API which serves as the backend for the Pleo app. Whenever a user of the app navigates to the expenses view, it calls this API to collect the list of expenses for that user.

Your objective is to write this new route to fetch the list of expenses for a given user. Right now that domain is empty, so you'll have to build everything from scratch- but you can look over at the user domain for inspiration. Please make sure that the endpoint scales adequately and supports paging, sorting and filtering. Additionally, we would also like you to write some tests for your route.

Finally, as a bonus objective, try to improve any aspect of this API. It could be to add more TS types, better security, tests, add features, graphql support, etc. 

## Instructions

Fork this repo with your solution. Ideally, we'd like to see your progression through commits, and don't forget to update the README.md to explain your thought process.

Please let us know how long the challenge takes you. We're not looking for how speedy or lengthy you are. It's just really to give us a clearer idea of what you've produced in the time you decided to take. Feel free to go as big or as small as you want.

## Install

Make sure that you have a modern version of `yarn` that supports workspaces (`>= 1.0`), then run:

```bash
yarn
```

You will also need to [install Postgres](https://www.postgresqltutorial.com/install-postgresql-macos/), create a `challenge` database and load the sql file `dump.sql`:

```bash
psql challenge < dump.sql
```

## Start

To enable logs, use the standard `NODE_DEBUG` flag with the value `DEBUG`

```bash
NODE_DEBUG=DEBUG yarn start
```

## Test

Make sure that you have a modern version of `yarn` that supports workspaces, then run:

```bash
yarn test
```

The command above will run the following test suites sequentially:

| Test suite | Run command | Description |
-------------|-------------|-------------|
| Unit | `yarn test:unit` | Simple unit tests. |
| Mid-level | `yarn test:mid-level` | Small integration tests that integration of small components together.  |
| Acceptances | `yarn test:acceptance` | Large integration tests, system tests, end-to-end tests. |


Happy hacking 😁!

## Solution

### Common
* Modify app routes structure to be more rest standards each domain register it's route with `${domain}-managements` prefix, for example all `user` domain routes will be served with `/user-management/*`
* Add [knex](https://knexjs.org/) -*query builder*- to the project to perform sql queries instead of native `pg` module
* Add golabl validate middleware that rely on [Joi](https://joi.dev/api/?v=17.6.0) to provide centeral API Request validator
* Add a docker-compose file to up a pg container locally (to facilitate running the db instance)

### User Domain
* Modify `v1-get-user.ts`, rename route to follow rest standard use `users/:id` instead of `get-user-details`
* Modify response serializer to return JSON instead of stringified object
* Add Joi validation with proper error message
* Add acceptance tests (e2e test cases for get user details endpoint)

### Expense Domain
* Use MVC like structure to organize domain/package files with a simple repository that encapsulate data layer
  * `expense.service` to encapsulate business logic (collect data from different repos. or apply additional filter depending on data access)
  * `expense.repository` to encapulate the communication with data storage
  * `expense.controller` which is the data representation layer. in our case it's responsible for aggregate req (query, params) and send the valid http response
  * `v1-get-expense` which is the registered route with all necessary middleware (for now we only have one middleware but it could vary)
* Add acceptance tests (e2e test cases for list expense endpoint)
