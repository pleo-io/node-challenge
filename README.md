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

# Approach

## Application Setup
- Fix app build for successful test run. 
- Externalized DB config: `host, port, username, password, dbname, dialect`. Can also add connection pooling config to this.
- Run app with config: `DB_USER=postgres DB_PASS=postgres DB_NAME=challenge yarn start`
_Time Spent_: 2hrs (approx). Had to setup dev env (node + ide) from scratch. 

## Expense Domain
_Time Spent_: 7hrs (approx).
#### Challenge
Defining an api for user expenses

#### Solution
- As per REST ideology, Expense should be a sub-resource of User as an expense cannot exist without user. Suggested API: `GET /user/{userId}/expense`
- As per DDD, expense should be a separate domain. Suggested API: `GET /expense?userId=xxx`. This api can be extended to support other usecases like analytics. Going with the second approach.
- Assuming that this API is supposed to be used Pleo app user, `userId` can be directly picked from security context like JWT or BasicAuth.

## Filtering | Sorting | Pagination

#### Challenge
Defining behavior for filtering, sorting & pagination for user expenses api

#### Assumptions
- Expenses will be fetched for single (currently logged-in) user. 
- Expenses filtering would be non-complex. Supporting opinionated filters for the same should suffice. Hence, skipping `GraphQL`.
- User will not be making multiple transactions at the same instant (physically impossible).
- Access pattern for expenses: Sorted `DESC` by `date_created` 

#### Solution
- Columns to support filtering on: `status`, `merchant_name`, `amount`, `currency`, `id (expense)`
- Multiple column filters will always be associated by `AND` clause. Multiple values for specific column will be associated by `OR` clause
- `amount_in_cents` column should support `>= minAmt` and `< maxAmt`  
- Above structure would be able to support query like: 
`status` IN [`pending`, `processed`] AND `amount_in_cents` >= `1000` AND `amount_in_cents` < `5000`
- Sorting will be supported on indexed `date_created` column. (Indexing date column might be tricky at scale but is solvable)
- Pagination will be supported by using `date_created` as `pageToken`. Next page of records would be accessed by using `date_created` of the last record of the previous page. Using the following structure should better scaling of the api.
Generated clause would be: `date_created > 2020-09-18T20:57:40 limit pageSize`

#### Challenge
Allowing multiple filters with `GET` Method may lead to the API exceeding 2048 char limit on URLs. 
Eg: `/expense/v1/get-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&from=2020-09-18T20:57:40&pageSize=2&statuses=pending;processed&merchant_name=barista&minAmount=1000&maxAmount=3000`

#### Solution
Although this might be a rare scenario, using `POST` method with filters in the request body is a scalable approach especially if more filters need to be supported.

#### Challenge
The `query` method declared in `db.ts` requires `prepared statement string` and `values array`. 
With filters being non-mandatory, the `prepared statement string` and `values array` needs to be customised based on the filters input.
Achieving the same with the existing `query` method would require writing a query builder which is a tedious task in itself.

#### Solution
Discovered Knex knexjs.org query builder, skipped using that since the project is fairly new. Decided against using it.
Figured that an ORM would be better option since it has query builder in-built. Sequelize seems to be the industry standard.
Intentionally using the entity models defined with Sequelize ORM as DTOs for now. Having separate DTOs decouples the DB and Controller layer and allows us to retain API contracts even if the db layer changes.

#### Validation
Added data validations using `class-validator` and `class-transformer` pckgs

## Testing
- Added acceptance tests for `get-user-details` api and `get-expenses` api
- Added db unit tests for `findExpenses` for filtering & sorting functionality
- Testing can be a lot more thorogh. Service level tests can also be included.
- Unit & Mid-Level tests: `DB_USER=postgres DB_PASS=postgres DB_NAME=challenge yarn test`
- Acceptance Tests: `API_URL_OVERRIDE=0.0.0.0:9001 yarn test:acceptance`
_Time Spent_: 8hrs (approx).

### PS: My primary language for coding is Java. It took me some time to explore constructs in node js, especially for writing test suites. This been a great learning experience for me.
