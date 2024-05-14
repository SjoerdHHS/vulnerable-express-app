# Vulnerable Express Application

This repository contains an intentionally vulnerable Express.js application connected to a PostgreSQL database. The application demonstrates common web application vulnerabilities for educational purposes only.
based on https://github.com/samoylenko/vulnerable-app-nodejs-express
## Features

- User profile updates via a PATCH request.
- User information retrieval.
- Dynamic SQL query execution.

## Prerequisites

- Node.js
- PostgreSQL
- NPM or Yarn

## Setup
```bash
git clone https://github.com/SjoerdHHS/vulnerable-express-app.git
cd vulnerable-express-app

# Install dependencies
npm i

# Start the database container
docker run --name some-postgres -e POSTGRES_PASSWORD=SYAII2LWftDyY3ft -p 5432:5432 -d postgres

# Start the application
node index.js
```
