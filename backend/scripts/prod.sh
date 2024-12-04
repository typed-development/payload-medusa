#!/bin/bash
#Run medusa migrations to ensure the database is updated
yarn db:migrate

#Run medusa server
yarn run start
