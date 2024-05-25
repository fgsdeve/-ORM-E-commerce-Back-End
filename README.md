# E-Commerce Back End

## Installation
Clone the Repository:

git clone <git@github.com:fgsdeve/-ORM-E-commerce-Back-End.git>
cd <repository_directory>

## Install Dependencies:
npm install

## Set Up Environment Variables:

Create a .env file in the root directory.
Add your database credentials in the following format:

DB_NAME='your_database_name'
DB_USER='your_postgresql_username'
DB_PASSWORD='your_postgresql_password'
DB_HOST='localhost'
DB_PORT='5432'

## Usage

### Create the Database:

npm run schema

### Seed the Database:

npm run seed

### Start the Server:

npm start

## API Endpoints:

Use Insomnia Core or any API client to test the endpoints.
GET routes for categories, products, and tags will return formatted JSON data.
POST, PUT, and DELETE routes for categories, products, and tags will allow you to create, update, and delete data in the database.

## Packages and Technologies Used

Express.js: A web application framework for Node.js, designed for building web applications and APIs.
Sequelize: A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
PostgreSQL: An open-source relational database management system.
dotenv: A zero-dependency module that loads environment variables from a .env file into process.env.
Insomnia Core: An API client for testing and debugging RESTful APIs.

## Methods and Resources Used

Sequelize Methods
Sequelize Models: Defined models for Category, Product, Tag, and ProductTag.
Associations: Established relationships between models (e.g., Product belongs to Category, Product has many Tags).
CRUD Operations: Implemented Create, Read, Update, and Delete operations for managing data in the PostgreSQL database.

## Learning Resources
Sequelize Documentation: Comprehensive guides and API reference for Sequelize.
Express.js Documentation: Official documentation for building applications with Express.js.
PostgreSQL Documentation: Detailed information on PostgreSQL installation, configuration, and usage.
Full-Stack Blog: Guidance on creating a video submission and additional learning resources for full-stack development.

Author
This tutorial was created by [FGSDEVE]. You can find more of my work on my GitHub profile "https://github.com/fgsdeve". 
Awalke through video: https://drive.google.com/file/d/1X5k0qkUwdLqa2xZMXTWqcvswJjYST9qI/view?usp=drive_link

License
This project is licensed under the MIT License.
