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

# Hear Me Out

## Before The Endpoint
### To make Tests run

   1. I commented out the assignment of ```config.auth.jwtSecret``` in ```config-injector.ts``` file present in ```test/utils/jest``` because it has no use in the whole code aside the assignment and the type error it was throwing was preventing tests from running.
    2. I fixed ```ts-jest[backports] (WARN) "[jest-config].globals.ts-jest.tsConfig" is deprecated, use "[jest-config].globals.ts-jest.tsconfig" instead.``` problem
    3. Fixed all the type dependencies in ```server.ts``` file to enable acceptance test.

### Little  refactoring
    
  I moved the capitalize function inside the ```formatter.ts``` file of the user domain to a separate module outside the user domain for the sake of reuseability because I realized I had to use it  also in the Expense domain.

  I tried to adhere to the already existing code structure for consistency and ease of implementation imagining that a new user is to work on same code base it’d be easier for them to recognize the patterns and continue.

  ## The Endpoint
  
  Summarily, I implemented filters, sorting, and pagination, caching and ran a couple of unit and e2e tests

  ### Filtering: 
  Data returned from querying the expenses of a particular user can be filtered by merchant_name, currency, status, and amount_in_cents, and a typical filter query looks like this 
  ```
  merchant_name:  /expense/v1/get-expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&merchant_name=Donkey Republic
  ```
  or 
  ```
  status: /expense/v1/get-expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&status=processed
  ```
  or
  ```
  currency: /expense/v1/get-expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&currency=DKK
  ```
  or
  ```
  amount_in_cents: expense/v1/get-expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&amount_in_cents=6000
  ```
  or
  ```
  all together: /expense/v1/get-expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&amount_in_cents=6000&status=processed&currency=DKK&merchant_name=Donkey Republic
  ```

  ### Sorting
  Data returned from querying the expenses of a particular user can be sorted by date_created and amount_in_cents, in both ascending and descending order like this
  ```
  date_created: /expense/v1/get-expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&sorBy[desc]=date_created
  ```
  or
  ```
  /expense/v1/get-expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&sortBy[asc]=amount_in_cents
  ```

  ### Pagination
  I implemented offset pagination method and it looks like this
  ```
  /expense/v1/get-expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&limit=10&offset=0&pageNumber=1
  ```

  Sorting and filtering can be combined as coonstraints to return desired result

  ```
  /expense/v1/get-expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&pageNumber=1&sortBy[asc]=amount_in_cents&currency=DKK
  ```

  ### Last Notes

1. I refactored the router by separating the handler into its own function body to maintain cleaner and more modular code.
2. Caching was done with memcache, it is prefered because it implements a multi-threaded architecture by utilizing multiple cores. Therefore, for storing larger datasets, Memcached can perform better than Redis, considering scalability.
3. I maintained the already existing design, with the exception of 1.
4. Took about 8 hrs to complete (I didn't finish it at once but if I were to add up all the little sessions spent on the project).
