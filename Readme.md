# Sports Facility Booking Platform

## Description

This project implements a RESTful API backend for a sports facility booking platform using TypeScript, Express.js, and MongoDB. It provides functionalities for managing users, facilities, bookings, and authentication.

## Features

- User authentication (signup and login)
- CRUD operations for facilities
- Booking management with time slot availability checking
- Error handling with detailed error responses
- Role-based access control (admin and user roles)
- Soft deletion of facilities

## Technologies Used

- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod

## Project Structure

The project is structured as follows:
```
├── src/
│ ├── env-config/
│ ├── errors/
│ ├── interface/
│ ├── middleware/
│ ├── models/
│       ├── booking/
│           ├── booking.controller.ts
│           ├── booking.interface.ts
│           ├── booking.model.ts
│           ├── booking.route.ts
│           ├── booking.service.ts
│           ├── booking.validation.ts
│       ├── facility/
│           ├── facility.controller.ts
│           ├── facility.interface.ts
│           ├── facility.model.ts
│           ├── facility.route.ts
│           ├── facility.service.ts
│           ├── facility.validation.ts
│       ├── users/
│           ├── users.controller.ts
│           ├── users.interface.ts
│           ├── users.model.ts
│           ├── users.route.ts
│           ├── users.service.ts
│           ├── users.validation.ts
│ ├── utils/
│ ├── app.ts
│ └── index.ts
├── .env
├── .eslintignore
├── .gitignore
├── eslint.config.mjs
├── package.json
└── README.md
└── tsconfig.json
```

## Live Link

Visit the live project: [https://nl3-a3.swdrana.com](https://nl3-a3.swdrana.com)

## API Endpoints
#### User Routes
1. **User Sign Up**
*   **Route**: `POST /api/auth/signup`
*   **Link**: [https://nl3-a3.swdrana.com/api/auth/signup](https://nl3-a3.swdrana.com/api/auth/signup)
*   **Request Body**:
```json
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "programming-hero",
  "phone": "01322901105",
  "role": "admin", // or 'user'
  "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
}
```

* **Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c4",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "role": "admin",
    "phone": "01322901105",
    "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
  }
}
```

2. **User Login**
*   **Route**: `POST /api/auth/login`
*   **Link**: [https://nl3-a3.swdrana.com/api/auth/login](https://nl3-a3.swdrana.com/api/auth/login)
*   **Request Body**:

```json
{
  "email": "web@programming-hero.com",
  "password": "programming-hero"
}
```

* **Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "token": "JWT_TOKEN",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c4",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "role": "admin",
    "phone": "01322901105",
    "address": "Level-4, 34, Awal Centre, Ban Myeni, Dhaka"
  }
}
```
  
3. **Create a Facility (Admin Only)**
---
*   **Route**: `POST /api/facility`
*   **Link**: [https://nl3-a3.swdrana.com/api/facility](https://nl3-a3.swdrana.com/api/facility)
*   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "name": "Tennis Court",
  "description": "Outdoor tennis court with synthetic surface.",
  "pricePerHour": 30,
  "location": "456 Sports Ave, Springfield"
}
```

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Facility added successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Tennis Court",
    "description": "Outdoor tennis court with synthetic surface.",
    "pricePerHour": 30,
    "location": "456 Sports Ave, Springfield",
    "isDeleted": false
  }
}
```

4. **Update a Facility (Admin Only)**
*   **Route**: `PUT /api/facility/:id`
*   **Link**: [https://nl3-a3.swdrana.com/api/facility/66805e4e069cb704c8ef2267](https://nl3-a3.swdrana.com/api/facility/66805e4e069cb704c8ef2267)
*   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "name": "Updated Tennis Court",
  "description": "Updated outdoor tennis court with synthetic surface.",
  "pricePerHour": 35,
  "location": "789 Sports Ave, Springfield"
}
```

* **Response**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Facility updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Updated Tennis Court",
    "description": "Updated outdoor tennis court with synthetic surface.",
    "pricePerHour": 35,
    "location": "789 Sports Ave, Springfield",
    "isDeleted": false
  }
}
```

5. **Delete a Facility - Soft Delete (Admin Only)**
*   **Route**: `DELETE /api/facility/:id`
*   **Link**: [https://nl3-a3.swdrana.com/api/facility/66805e4e069cb704c8ef2267](https://nl3-a3.swdrana.com/api/facility/66805e4e069cb704c8ef2267)
*   **Headers**:

```plain
      Authorization: Bearer JWT_TOKEN
```

*   **Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Facility deleted successfully",
  "data": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Updated Tennis Court",
      "description": "Updated outdoor tennis court with synthetic surface.",
      "pricePerHour": 35,
      "location": "789 Sports Ave, Springfield",
      "isDeleted": true
    }
}

```

**6\. Get All Facilities**

*  **Route**: `GET /api/facility`
*   **Link**: [https://nl3-a3.swdrana.com/api/facility/](https://nl3-a3.swdrana.com/api/facility/)
*  **Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Facilities retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Tennis Court",
      "description": "Outdoor tennis court with synthetic surface.",
      "pricePerHour": 30,
      "location": "456 Sports Ave, Springfield",
      "isDeleted": false
    }
  ]
}
```

  

#### Booking Routes

  
### 7\. Check Availability

Check the availability of time slots for booking on a specific date.

*   **Route**: `GET /api/check-availability`

*   **Link**: [https://nl3-a3.swdrana.com/api/check-availability](https://nl3-a3.swdrana.com/api/check-availability)
#### Example Request

```sql
GET /api/check-availability?date=2024-06-15
```

#### Example Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Availability checked successfully",
  "data": [
      {
          "startTime": "08:00",
          "endTime": "10:00"
      },
      {
          "startTime": "14:00",
          "endTime": "16:00"
      }
   ]
}
```
**8\. Create a Booking (User Only)**

  *   **Route**: `POST /api/bookings`
  *   **Link**: [https://nl3-a3.swdrana.com/api/bookings](https://nl3-a3.swdrana.com/api/bookings)
  *   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "facility": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-06-15",
  "startTime": "10:00",
  "endTime": "13:00"
}
```
* **Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c6",
    "facility": "60d9c4e4f3b4b544b8b8d1c5",
    "date": "2024-06-15",
    "startTime": "10:00",
    "endTime": "13:00",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "payableAmount": 90,
    "isBooked": "confirmed"
  }
}
```

`If the facility is unavailable during the requested time slot, an error response is returned.`

**9\. View All Bookings (Admin Only)**

  *   **Route**: `GET /api/bookings`
  *   **Link**: [https://nl3-a3.swdrana.com/api/bookings](https://nl3-a3.swdrana.com/api/bookings)
  *   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

* **Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": {
        "_id": "60d9c4e4f3b4b544b8b8d1c4",
        "name": "Programming Hero",
        "email": "programming.hero@example.com",
        "phone": "+1234567890",
        "role": "user",
        "address": "456 Elm Street"
      },
      "payableAmount": 90,
      "isBooked": " confirmed"
    }
  ]
}
```

**10\. View Bookings by User (User Only)**

  *   **Route**: `GET /api/bookings/user`
  *   **Link**: [https://nl3-a3.swdrana.com/api/bookings/user](https://nl3-a3.swdrana.com/api/bookings/user)
  *   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": "60d9c4e4f3b4b544b8b8d1c4",
      "payableAmount": 90,
      "isBooked": " confirmed"
    }
  ]
}
```

**11\. Cancel a Booking (User Only)**

  *   **Route**: `DELETE /api/bookings/:id`
  *   **Link**: [https://nl3-a3.swdrana.com/api/bookings/MONGODBOBJECTID](https://nl3-a3.swdrana.com/api/bookings/MONGODBOBJECTID)
  *   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking cancelled successfully",
  "data": {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": "60d9c4e4f3b4b544b8b8d1c4",
      "payableAmount": 90,
      "isBooked": "canceled"
    }
}
```
## Getting Started

To get started with this project, follow these steps:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Set up environment variables as specified in `.env`.
4. Run the development server with `npm run dev`.

___
---
# Thank You for visit my repo. 
## Get more update follow: https://facebook.com/swdrana