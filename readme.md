# Project Title

A backend project built with TypeScript, Express.js, Prisma, and PostgreSQL using Docker.

## Table of Contents

- [Project Description](#project-description)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Screenshot](#screenshot)
- [Contributing](#contributing)
- [License](#license)

## Project Description

for this project i used xsxl for reading the excel file and prisma for database and express for the server and typescript for the language and docker for the database prisma as orm and postgressql as database morgan and winston for logging for logs you can setup log/erro.log and log/combined.log and you can use postman to test the endpoints

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-project.git
   ```

2 set up mysql or postgressql database using docker or locally

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory of the project and add the following environment variables:

   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/database"
   ```
5. Run the project:

   ```bash
   npm run dev
   ```
## Usage

you can use this backend to process your excel data and store it into database

## Endpoints
/api/upload to upload excel file
/api/products to get all products
/api/products/:id to get product by id
/api/products/:id to update product by id
/api/products/:id to delete product by id
/api/products to create product

## Screenshot

![screenshot](https://github.com/bilalabdelkadir/excel-processer-client/blob/main/src/assets/prisma.png)
this is how the prisma will look like after you run the project