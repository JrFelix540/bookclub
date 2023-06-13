# BookClub Server - Built with Node, Express and Postgres

## Description

A community/discussion-first approach to discussing books, inspired by [Reddit](http://reddit.com/) and [goodreads](https://www.goodreads.com/)

## Getting started

First make sure that the `.env.development` file in the `env` folder is defined with the appropriate environmental variables.
Then you can just start up the API service by running `docker compose up`.

Afterwards, navigate to `http://localhost:${PORT}/graphql/` to access the GraphQL Playground.

## Environment Variables

These are the environmental variables that the api will need in order to properly function.

- DATABASE_URL
- PORT
- MODE
- JWT_SECRET
