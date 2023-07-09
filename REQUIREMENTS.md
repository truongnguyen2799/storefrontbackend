# Storefront Backend API Requirements

## Overview
This API serves as the backend for a storefront application. It provides the necessary endpoints to manage products, orders, and users.

## RESTful Routes

### Products

- `GET /product/all` - Retrieve all products
- `GET /product/show/:id` - Retrieve a specific product by ID
- `POST /product/insert` - Create a new product [token required]

### Orders

- `GET /order/:userid` - Current Order by user

### Users

- `POST /login` - User login
- `GET /user/all` - Show all user
- `GET /user/show/:id` - Show user by id
- `POST /user/insert` - Create a new user

## Database Schema

The database schema should include the following tables:

### Product

- `id` (integer, primary key, DEFAULT nextval('"Product_id_seq"'::regclass))
- `name` (character varying(256), required)
- `price` (numeric(10,2), required)
- `category` (character varying(256))

### Orders

- `id` (integer, primary key, DEFAULT nextval('"Orders_id_seq"'::regclass))
- `user_id` (integer, foreign key referencing the `users` table)
- `status_of_order` (character varying(1), required )

### Order_Product

- `order_id` (integer, primary key, foreign key referencing the `orders` table)
- `product_id` (integer, primary key, foreign key referencing the `products` table)
- `quantity` (integer, required)

### Users

- `id` (integer, primary key, DEFAULT nextval('"User_id_seq"'::regclass))
- `firstname` (string, required)
- `lastname` (string, required)
- `password` (text, required)
- `account` (character varying(256), UNIQUE, required)

## Authentication

- JWT (JSON Web Tokens) should be used for user authentication.
- The API should generate a JWT upon successful user login.