> :warning: This repository was archived automatically since no ownership was defined :warning:
>
> For details on how to claim stewardship of this repository see:
>
> [How to configure a service in OpsLevel](https://www.notion.so/pleo/How-to-configure-a-service-in-OpsLevel-f6483fcb4fdd4dcc9fc32b7dfe14c262)
>
> To learn more about the automatic process for stewardship which archived this repository see:
>
> [Automatic process for stewardship](https://www.notion.so/pleo/Automatic-process-for-stewardship-43d9def9bc9a4010aba27144ef31e0f2)

# Node Challenge

Take home test for Node.js developers.

## The challenge

This challenge has been designed to measure your knowledge of Node.js, Express, Typescript and various technologies, like monorepos, databases and testing. For your exercise, you will be enhancing this API which serves as the backend for a fictional Pleo app. Whenever a user of the app navigates to the expenses view, it calls this API to collect the list of expenses for that user.

Your objective is to write this new route to fetch the list of expenses for a given user. Right now that domain is empty, so you'll have to build everything from scratch- but you can look over at the user domain for inspiration. Please make sure that the endpoint scales adequately and supports paging, sorting and filtering. Additionally, we would also like you to write some tests for your route.

Finally, as a bonus objective, try to improve any aspect of this API. It could be to add more TS types, better security, tests, add features, graphql support, etc. 

## Instructions

Fork this repo with your solution. Ideally, we'd like to see your progression through commits, and don't forget to update the README.md to explain your thought process.

Please let us know how long the challenge takes you. We're not looking for how speedy or lengthy you are. It's just really to give us a clearer idea of what you've produced in the time you decided to take. Feel free to go as big or as small as you want.

## Installing

Make sure that you have a modern version of `yarn` that supports workspaces (`>= 1.0`), then run:

```bash
yarn
```

Start a Postgres Docker container, or alternatively run Postgres outside docker. 

```bash
docker run --name pleo-postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

Copy the `.env.example` file as `.env` and optionally update it to reflect the proper authentication for your locally running Postgres instance.

```bash
cp .env.example .env
```

Create a `pleo_node_challenge` database in your local instance. The following two steps assume your local postgres instance is running and accessible on 0.0.0.0:5432 as user `postgres` with password `postgres`. Please update below connection string accordingly if that's not the case. 

```bash
psql -d "postgresql://postgres:postgres@0.0.0.0" -c 'CREATE DATABASE pleo_node_challenge'
```

Insert some dummy data:

```bash
psql -d "postgresql://postgres:postgres@0.0.0.0/pleo_node_challenge" < insert-dummy-data.sql
```

## Running

To enable logs, use the standard `NODE_DEBUG` flag with the value `DEBUG`

```bash
NODE_DEBUG=DEBUG yarn start
```

## Testing

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
