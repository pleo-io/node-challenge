# Node Challenge

Take home test for Node.js developers.

## The challenge

This challenge has been designed to measure your knowledge of Node.js, Express, Typescript and various technologies,
like monorepos, databases and testing. For your exercise, you will be enhancing this API which serves as the backend for
the Pleo app. Whenever a user of the app navigates to the expenses view, it calls this API to collect the list of
expenses for that user.

Your objective is to write this new route to fetch the list of expenses for a given user. Right now that domain is
empty, so you'll have to build everything from scratch- but you can look over at the user domain for inspiration. Please
make sure that the endpoint scales adequately and supports paging, sorting and filtering. Additionally, we would also
like you to write some tests for your route.

Finally, as a bonus objective, try to improve any aspect of this API. It could be to add more TS types, better security,
tests, add features, graphql support, etc.

## Instructions

Fork this repo with your solution. Ideally, we'd like to see your progression through commits, and don't forget to
update the README.md to explain your thought process.

Please let us know how long the challenge takes you. We're not looking for how speedy or lengthy you are. It's just
really to give us a clearer idea of what you've produced in the time you decided to take. Feel free to go as big or as
small as you want.

## Install

Make sure that you have a modern version of `yarn` that supports workspaces (`>= 1.0`), then run:

```bash
yarn
```

You will also need to [install Postgres](https://www.postgresqltutorial.com/install-postgresql-macos/), create
a `challenge` database and load the sql file `dump.sql`:

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

# Change Log

- Added docker-compose for easy development setup.
- Added sequelize (it was sequelize vs typeorm vs prisma) -> I picked sequelize because it supports multiple db's so
  read
  replicas can be used for data fetching + it is also backwards compatible with raw sql queries.
- Added class-validator - For creating dto's and validating dto's (joi alternative)
- Introduced variation of hexagonal architecture pattern of controller -> dto -> service -> model <- service -> dto ->
  controller , validation can be
  done on the dto
  object
    * Essentially any time a data object is transferred from one layer to another we do it via a data transfer object
      , and we validate the data before sending it to the next layer
    * We define a "validate" method on the dto class
    * Inspiration was taken from django's serializers and nestjs validation pipelines

## How to test:

1. Run ```docker-compose up --build```
2. Request the expenses for a userId

```bash
curl --location --request GET 'http://localhost:9001/expense/v1/get-user-expenses/da140a29-ae80-4f0e-a62d-6c2d2bc8a474?limit=1'
```

## Notes:

- I added a single unit test example for one of the DTO objects as a unit-test example
- The service layer for expenses supports receiving the model/entity via dep injection which makes future testing
  simpler.
