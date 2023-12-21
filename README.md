# Getting Started with node server App

# About the app:

Server-side development for a web application, a website management system that allows business users
Publish content, edit and delete it.

## Installation

Install the node_modules

```bash
npm i
```

## Available Scripts

you can run:

### `npm start`

- It will run the app with node (NODE_ENV=prod)
- The page will not reload if you make edits.
- You must have a mongoDB Atlas Cluster

### `pnpm watch`

- Runs the app with tsx (NODE_ENV=dev)
- The page will reload if you make edits
- The print at the terminal will be yellow with the message:

`App is running on http://localhost:8080`

And if there are no login errors you should see the message painted in bold blue:

`Database Connected`

## Available Routes

Here you can find API addresses that the server will respond to as well as what should be sent to them in the body of the HTTP request and what permissions are required to receive a response from a specific API

### Users API

#### API for Register a new user

```http
  POST /api/v1/users
```

#### Request

In the request body you will need to provide an object with the following keys and values

| index      | type    | index       | type   | min | max | remark   |
| ---------- | ------- | ----------- | ------ | --- | --- | -------- |
| name       | object  |             |        |     |     | required |
|            |         | first       | string | 2   | 256 | required |
|            |         | middle      | string | 0   | 256 |          |
|            |         | last        | string | 2   | 256 | required |
| phone      | string  |             |        | 9   | 11  | required |
| email      | string  |             |        | 5   | 30  | required |
| password   | string  |             |        | 7   |     | required |
| image      | object  |             |        |     |     |          |
|            |         | url         | string | 14  | 100 |          |
|            |         | alt         | string | 2   | 256 |          |
| address    | object  |             |        |     |     | required |
|            |         | state       | string | 2   | 256 |          |
|            |         | country     | string | 2   | 256 | required |
|            |         | city        | string | 2   | 256 | required |
|            |         | street      | string | 2   | 256 | required |
|            |         | houseNumber | number | 2   | 256 | required |
|            |         | zip         | number | 2   |     | required |
| isBusiness | boolean |             |        |     |     | required |

- "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&\*-
- "phone" must be a standard Israeli phone number
- "email" must be a standard email
- "image/url" must be a standard URL

#### API for Login a user

```http
  POST /api/v1/users/login
```

### Request

In the request body you will need to provide an object with the following keys and values

| index    | type   | min | max | remark   |
| -------- | ------ | --- | --- | -------- |
| email    | string | 5   |     | required |
| password | string | 7   | 20  | required |

- "email" must be a standard email
- "password" must be at least seven characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&\*-

### Response

If the user is in the database and the password sent is correct, a token will be returned and the following object can be extracted from it with the help of the jwt-decode library

| index   | type    |
| ------- | ------- |
| id      | string  |
| email   | string  |
| isAdmin | boolean |

#### API for Information about all the users

```http
  GET /api/v1/users
```

### Request

- You will need to provide a token to get an answer from this api
- You will need to be Admin type user to get an answer from this api

#### API for Information about a user

```http
  GET /api/v1/users/:id
```

### Request

- You will need to provide a token to get an answer from this api
- You will need to be the registered user or Admin type user to get an answer from this api

#### API for Updating User information

```http
  PUT /api/v1/users/:id
```

### Request

In the request body you will need to provide an object with the following keys and values

| index      | type    | index       | type   | min | max | remark   |
| ---------- | ------- | ----------- | ------ | --- | --- | -------- |
| name       | object  |             |        |     |     | required |
|            |         | first       | string | 2   | 256 | required |
|            |         | middle      | string | 2   | 256 |          |
|            |         | last        | string | 2   | 256 | required |
| phone      | string  |             |        | 9   | 11  | required |
| email      | string  |             |        | 5   | 30  | required |
| password   | string  |             |        | 7   | 20  | required |
| image      | object  |             |        |     |     |          |
|            |         | url         | string | 14  | 100 |          |
|            |         | alt         | string | 2   | 256 |          |
| address    | object  |             |        |     |     | required |
|            |         | state       |        | 2   | 256 |          |
|            |         | country     |        | 2   | 256 | required |
|            |         | city        |        | 2   | 256 | required |
|            |         | street      |        | 2   | 256 | required |
|            |         | houseNumber |        | 2   | 256 | required |
|            |         | zip         |        | 2   | 256 | required |
| isBusiness | boolean |             |        |     |     | required |

- The user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&\*-
- "phone" must be a standard Israeli phone number
- "email" must be a standard email
- "image/url" must be a standard URL
- You will need to provide a token to get an answer from this api
- You need to be Admin to get an answer from this api

#### API for deleting a user

```http
  DELETE /api/v1/users/:id
```

- You will need to provide a token to get an answer from this api
- You will need to be the registered user or Admin to get an answer from this api

#### API for changing user business status

```http
  PATCH /api/v1/users/:id
```

- You will need to provide a token to get an answer from this api
- You will need to be the registered user or Admin to get an answer from this api

### Cards API

#### API to get all business cards

```http
  GET /api/v1/cards/
```

#### API for get a business card of a specific business

```http
  GET /api/v1/cards/:id
```

#### API for receive all business cards of the registered user

```http
  GET /api/v1/cards/my-cards
```

- You will need to provide a token to get an answer from this api

#### API for create a new business card

```http
  POST /api/v1/cards/
```

### Request

In the request body you will need to provide an object with the following keys and values

| index       | type   | index       | type   | min | max  | remark   |
| ----------- | ------ | ----------- | ------ | --- | ---- | -------- |
| title       | string |             |        | 2   | 256  | required |
| subtitle    | string |             |        | 2   | 256  | required |
| description | string |             |        | 2   | 1024 | required |
| phone       | string |             |        | 9   | 11   | required |
| email       | string |             |        | 5   | 30   | required |
| web         | string |             |        | 14  | 50   |          |
| image       | object |             |        |     |      | required |
|             |        | url         | string | 14  | 256  |          |
|             |        | alt         | string | 2   | 256  |          |
| address     | object |             |        |     |      | required |
|             |        | state       | string |     |      |          |
|             |        | country     | string | 2   | 256  | required |
|             |        | city        | string | 2   | 256  | required |
|             |        | street      | string | 2   | 256  | required |
|             |        | houseNumber | number | 2   | 256  | required |
|             |        | zip         | number | 2   |      | required |

- "phone" must be a standard Israeli phone number
- "email" must be a standard email
- "web" must be a standard URL
- "image/url" must be a standard URL
- You will need to provide a token to get an answer from this api
- You will need to be a Business type user to get an answer from this api

#### API for updating business card information

```http
  PUT /api/v1/cards/:id
```

### Request

In the request body you will need to provide an object with the following keys and values

| index       | type   | index       | type   | min | max  | remark   |
| ----------- | ------ | ----------- | ------ | --- | ---- | -------- |
| title       | string |             |        | 2   | 256  | required |
| subtitle    | string |             |        | 2   | 256  | required |
| description | string |             |        | 2   | 1024 | required |
| phone       | string |             |        | 9   | 11   | required |
| email       | string |             |        | 5   | 30   | required |
| web         | string |             |        | 14  |      |          |
| image       | object |             |        |     |      | required |
|             |        | url         | string | 14  | 100  |          |
|             |        | alt         | string | 2   | 256  |          |
| address     | object |             |        |     |      | required |
|             |        | state       | string |     |      |          |
|             |        | country     | string | 2   | 256  | required |
|             |        | city        | string | 2   | 256  | required |
|             |        | street      | string | 2   | 256  | required |
|             |        | houseNumber | number | 2   | 256  | required |
|             |        | zip         | number | 2   | 256  | required |

- "phone" must be a standard Israeli phone number
- "email" must be a standard email
- "web" must be a standard URL
- "image/url" must be a standard URL
- You will need to provide a token to get an answer from this api
- You will need to be a Business type user to get an answer from this api

#### API for liking a business card

```http
	PATCH /api/v1/cards/:id
```

- You will need to provide a token to get an answer from this api

#### API for deleting a business card

```http
  DELETE /api/v1/cards/:id
```

- You will need to provide a token to get an answer from this api
- You must be the user who created the card or an admin in order to delete the business card
