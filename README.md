# API Documentation

## Overview

This document provides details about the API endpoints for the User-to-Astrologer distribution system. The API is hosted locally on port `5500`. It enables operations such as distributing users to astrologers, retrieving all users or astrologers, and fetching astrologers with the highest ratings or connections. For more information, visit the GitHub repository: [GitHub Repository](https://github.com/example/astro-distribution).

### Logic Behind User Distribution to Astrologer

The user distribution leverages a cloud computing load balancer to optimize resource utilization and ensure fair allocation. The system combines **least connection** and **weighted round-robin** techniques to determine which astrologer should be assigned a user. The formula for calculating the effective load of an astrologer is:

```
Effective Load = Weight / Connections
```

- **Least Connection:** Prioritizes astrologers with fewer active connections.
- **Weighted Round Robin:** Allocates users based on astrologer-specific weights (e.g., experience, rating).

This hybrid approach ensures efficient load balancing and equitable user distribution, improving the overall performance and user experience.

Base URL:

```
http://localhost:5500/api
```

---

## Endpoints

### 1. **Distribute Users to Astrologers**

#### Endpoint:

```
POST /distribute
```

#### Description:

Distributes unassigned users to astrologers based on predefined criteria.

#### Request Body:

*None*

#### Response:

- **Success (200):**

```json
{
  "message": "Users distributed to astrologers successfully",
  "data": [
    {
      "userId": "<user_id>",
      "astrologerId": "<astrologer_id>"
    }
  ]
}
```

- **Error (500):**

```json
{
  "message": "An error occurred during user assignment",
  "error": "<error_details>"
}
```

#### Example Usage:

```bash
curl -X POST http://localhost:5500/api/distribute
```

---

### 2. **Get All Users**

#### Endpoint:

```
GET /users
```

#### Description:

Fetches all users in the database.

#### Request Body:

*None*

#### Response:

- **Success (200):**

```json
{
  "message": "All users fetched successfully",
  "data": [
    {
      "_id": "<user_id>",
      "name": "<user_name>",
      "email": "<user_email>",
      "astrologer": "<astrologer_id>"
    }
  ]
}
```

- **Error (500):**

```json
{
  "message": "An error occurred while fetching users",
  "error": "<error_details>"
}
```

#### Example Usage:

```bash
curl -X GET http://localhost:5500/api/users
```

---

### 3. **Get All Astrologers**

#### Endpoint:

```
GET /astrologers
```

#### Description:

Fetches all astrologers in the database.

#### Request Body:

*None*

#### Response:

- **Success (200):**

```json
{
  "message": "All astrologers fetched successfully",
  "data": [
    {
      "_id": "<astrologer_id>",
      "name": "<astrologer_name>",
      "experience": <years_of_experience>,
      "rating": <rating>,
      "connection": <number_of_connections>,
      "assignedUser": ["<user_id>"]
    }
  ]
}
```

- **Error (500):**

```json
{
  "message": "An error occurred while fetching astrologers",
  "error": "<error_details>"
}
```

#### Example Usage:

```bash
curl -X GET http://localhost:5500/api/astrologers
```

---

### 4. **Get Astrologer with the Highest Rating**

#### Endpoint:

```
GET /higher-rating-astrologer
```

#### Description:

Fetches the astrologer with the highest rating in the database.

#### Request Body:

*None*

#### Response:

- **Success (200):**

```json
{
  "message": "Astrologer with highest rating fetched successfully",
  "data": {
    "_id": "<astrologer_id>",
    "name": "<astrologer_name>",
    "rating": <rating>
  }
}
```

- **Error (500):**

```json
{
  "message": "An error occurred while fetching astrologer",
  "error": "<error_details>"
}
```

#### Example Usage:

```bash
curl -X GET http://localhost:5500/api/higher-rating-astrologer
```

---

### 5. **Get Astrologer with the Highest Connections**

#### Endpoint:

```
GET /higher-connection-astrologer
```

#### Description:

Fetches the astrologer with the highest number of connections in the database.

#### Request Body:

*None*

#### Response:

- **Success (200):**

```json
{
  "message": "Astrologer with highest connections fetched successfully",
  "data": {
    "_id": "<astrologer_id>",
    "name": "<astrologer_name>",
    "connection": <number_of_connections>
  }
}
```

- **Error (500):**

```json
{
  "message": "An error occurred while fetching astrologer",
  "error": "<error_details>"
}
```

#### Example Usage:

```bash
curl -X GET http://localhost:5500/api/higher-connection-astrologer
```

---

## Error Codes

- **500 Internal Server Error:** An unexpected error occurred on the server.
- **400 Bad Request:** The request is malformed or missing required parameters.

---

## Environment Configuration

The API requires the following environment variables to be set:

- **FRONTEND\_URL:** URL of the frontend application.

Example `.env` file:

```
FRONTEND_URL=http://localhost:3000
```

---

## Notes

1. Ensure that the database is seeded with astrologers and users before testing.
2. Replace placeholder values (`<astrologer_id>`, `<user_id>`, etc.) with actual data from your database.
3. Use a REST client like Postman or cURL to test the API.

---

## Contact

For issues or support, please contact the API development team.

