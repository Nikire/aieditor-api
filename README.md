## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

### Docker project install

1. Make sure to setup your `.emv` file using the `.env.example` file

2. [Installation](#installation) is needed

3. Run `docker-compose up --build` to mount the docker container.

## Running the app locally

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Using docker-compose

```bash
$ docker-compose up -d
```

## Prisma DB Migrations

```bash
# run migrations
yarn run prisma migrate dev

# create new migration
yarn run prisma migrate dev --name <your_migration_name>
```
