# Node Challenge

Take home test for Node.js developers.

## The challenge

This challenge has been designed to measure your knowledge of Node.js, Express, Typescript and various technologies, like monorepos, databases and testing. For your exercise, you will be enhancing this API which serves as the backend for the Pleo app. Whenever a user of the app navigates to the expenses view, it calls this API to collect the list of expenses for that user.

Your objective is to write this new route to fetch the list of expenses for a given user. Right now that domain is empty, so you'll have to build everything from scratch- but you can look over at the user domain for inspiration. Please make sure that the endpoint scales adequately and supports paging, sorting and filtering. Additionally, we would also like you to write some tests for your route.

Finally, as a bonus objective, try to improve any aspect of this API. It could be to add more TS types, better security, tests, add features, graphql support, etc. 

## Instructions

Fork this repo with your solution. Ideally, we'd like to see your progression through commits, and don't forget to update the README.md to explain your thought process.

Please let us know how long the challenge takes you. We're not looking for how speedy or lengthy you are. It's just really to give us a clearer idea of what you've produced in the time you decided to take. Feel free to go as big or as small as you want.

## Description



### What I did. 
 - [X] Create the expenses API under the endpoint GET `/expenses/get-expenses` with defined search criteria and allows some pagination. 
  - [X] Add class-validator and class-transformer to make easier the http request validation. 
  - [X] Create catchAsync function to decorate controllers action in order to manage the unexpected async error and reduce the dependency of next function. 
- [X] Add a docker-compose file to wrap all the infrastructure so that it does not need to have it in the host machine.
- [X] Refactor the configuration to get them from environment variables. 
- [X] Separate the server creation from the application creation to separate both responsibilities
- [X] Upgrade the `jest.config.js` files. 
 ### What I would have done if I have time
 - [ ] Add to the docker-compose the application.
 - [ ] Add Github actions to enable a ci pipeline.
 - [ ] Separate all applications files (a.k.a middleware, server.ts , etc ) in a different folder leaving just the configuration files and the entry point in the folder root.  
 - [ ] Standardised the  modules by following the pattern from expenses packages
 - [ ] Improve logging by externalizing the implementation by using either [pino](npmjs.com/package/pino) or [wiston](npmjs.com/package/winston). 
 - [ ] Improve the observability by adding Prometheus to collect either system metrics or custom metrics
 - [ ] Improve the readiness check by checking if the database is alive
 - [ ] Add more typing to the object and functions.  
 
 ### Challenges I faced.
  * During the validation of the sorting field in the expenses.dto the @ValidatedNested decorators didn't work for me. So in order to work around it I created a custom decorator to fullfil the job, Here might be a area of improvement. 
  * During the tests execution I face with a annoying warning that I couldn't figure it out how to remove it: See below
    `console.error WARNING: NODE_ENV value of 'test' did not match any deployment config file names.`


 
### How long it took me to get this point.
I started working on Wednesday and finish on friday morning, dedicating around 5 hours per day.

## Install

Make sure that you have a modern version of `yarn` that supports workspaces (`>= 1.0`), then run:

```bash
yarn
```


## Start

1.  ##### Set environment variables
```bash 
  cp ./.env.example ./.env
```

2. ##### Run docker-composer 
```bash
docker-compose up -d
```

3.  ##### Start the application
  **note:** To enable logs, use the standard `NODE_DEBUG` flag with the value `DEBUG`
```bash

NODE_DEBUG=DEBUG yarn start
```

## Test

1.  ##### Set environment variables
```bash 
   cp ./.env.example ./.env.test
```
and copy on `.env.test` the following
``` 
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=challenge
DB_USER=postgres
DB_PASSWORD=postgres
```

2.  ##### Run docker-composer 
```bash
docker-compose up -d
```

3. ##### Run test
 **note:** Make sure that you have a modern version of `yarn` that supports workspaces, then run:

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
