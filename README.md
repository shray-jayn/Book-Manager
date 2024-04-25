# Books Manager

## Description
Books Manager is a web application that allows users to manage a collection of books. Users can perform CRUD (Create, Read, Update, Delete) operations on books, as well as filter books by author or publication year.

## Setup
1. Create a ```.env``` file in the Root folder.
    ```
    PORT = 
    MONGOURL = 
    SECRET_KEY_FOR_CRYPTOJS = 
    ```

## How to Run
1. Open the terminal and run:
    ```
    npm install
    ```
2. Then run:
    ```
    nodemon server.js
    ```
3. The server will start running on [http://localhost:5000/](http://localhost:5000/)

## 🚀 Technologies Used

- **ExpressJS**: Web application framework for building the application.
- **Node.js/Express.js**: Backend framework for creating REST APIs and managing the database.
- **JWT (JSON Web Tokens)**: Secure authentication and authorization mechanism.
- **MongoDB**: NoSQL database for CRUD operations on data and user management.
- **Postman**: Tool for testing and documenting APIs.
- **Cors**: Middleware for enabling cross-origin resource sharing.
- **Crypto-js**: Library for encryption and decryption tasks.
- **Dotenv**: Module for managing environment variables.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **Morgan**: HTTP request logger middleware for Node.js.
- **Zod**: A TypeScript-first schema declaration and validation library. It ensures type safety and validation of data structures, helping maintain consistency and reliability in the application's data handling.
- **Nodemon**: Utility for automatically restarting the server upon code changes.

## API Documentation

### Authentication Endpoints

**Register User**

- Endpoint: POST `/auth/register`
- Description: Registers a new user.
- Request Body:
  - `username`: String (3-50 characters)
  - `email`: String (valid email format)
  - `password`: String (minimum 6 characters)
- Response:
  - `success`: Boolean
  - `message`: String
  - `user`: Object (contains user information and access token)

**Login User**

- Endpoint: POST `/auth/login`
- Description: Logs in a user.
- Request Body:
  - `email`: String (valid email format)
  - `password`: String (minimum 6 characters)
- Response:
  - `success`: Boolean
  - `message`: String
  - `user`: Object (contains user information and access token)

### Book Endpoints

**Create Book**

- Endpoint: POST `/books`
- Description: Creates a new book entry.
- Request Body:
  - `title`: String
  - `author`: String
  - `publicationYear`: Number
- Response:
  - `success`: Boolean
  - `message`: String
  - `book`: Object (contains book information)

**Get All Books**

- Endpoint: GET `/books`
- Description: Retrieves all books.
- Response:
  - `success`: Boolean
  - `books`: Array of book objects

**Get Book by ID**

- Endpoint: GET `/books/:id`
- Description: Retrieves a book by its ID.
- Request Parameters:
  - `id`: String (MongoDB ObjectID)
- Response:
  - `success`: Boolean
  - `book`: Object (contains book information)

**Update Book by ID**

- Endpoint: PUT `/books/:id`
- Description: Updates a book by its ID.
- Request Parameters:
  - `id`: String (MongoDB ObjectID)
- Request Body: (fields to be updated)
  - `title`: String
  - `author`: String
  - `publicationYear`: Number
- Response:
  - `success`: Boolean
  - `book`: Object (contains updated book information)

**Delete Book by ID**

- Endpoint: DELETE `/books/:id`
- Description: Deletes a book by its ID.
- Request Parameters:
  - `id`: String (MongoDB ObjectID)
- Response:
  - `success`: Boolean
  - `message`: String

**Filter Books by Author**

- Endpoint: GET `/books/filter/author`
- Description: Retrieves books filtered by author.
- Query Parameters:
  - `author`: String (author name)
- Response:
  - `success`: Boolean
  - `books`: Array of book objects

**Filter Books by Publication Year**

- Endpoint: GET `/books/filter/publicationYear`
- Description: Retrieves books filtered by publication year.
- Query Parameters:
  - `publicationYear`: Number (year)
- Response:
  - `success`: Boolean
  - `books`: Array of book objects






## Middleware

Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application's request-response cycle. They can perform tasks such as authentication, authorization, logging, data parsing, etc. Here are the middleware functions used in this application:

### Authentication Middleware

**verifyToken**

- Description: Verifies the JWT token provided in the request header.
- Functionality: Parses the JWT token, verifies its validity, and attaches the decoded user information to the request object.
- Usage: Used to protect routes that require authentication.

### Request Validation Middleware

**validateAuthorBody**

- Description: Validates the request query parameter for filtering books by author.
- Functionality: Validates that the query parameter 'author' is a string between 1 and 255 characters.
- Usage: Used to validate the request before filtering books by author.

**validatePublicationYearBody**

- Description: Validates the request query parameter for filtering books by publication year.
- Functionality: Validates that the query parameter 'publicationYear' is a valid year between 1000 and 9999.
- Usage: Used to validate the request before filtering books by publication year.

**validateBookBody**

- Description: Validates the request body when creating or updating a book.
- Functionality: Validates that the request body contains the required fields for a book (title, author, publicationYear) and that their values meet certain criteria.
- Usage: Used to validate the request before creating or updating a book.

**validateIdParam**

- Description: Validates the request parameter for book ID.
- Functionality: Validates that the request parameter 'id' is a valid MongoDB ObjectID.
- Usage: Used to validate the request before performing operations on a book by its ID.

### Authentication Input Validation Middleware

**validateRegisterInput**

- Description: Validates the request body when registering a new user.
- Functionality: Validates that the request body contains the required fields for user registration (username, email, password) and that their values meet certain criteria.
- Usage: Used to validate the request before registering a new user.

**validateLoginInput**

- Description: Validates the request body when logging in a user.
- Functionality: Validates that the request body contains the required fields for user login (email, password) and that their values meet certain criteria.
- Usage: Used to validate the request before logging in a user.
