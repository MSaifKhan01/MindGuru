# MindGuru




## Table of Contents

- [Introduction](#introduction)
- [Links](#Links)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [How to Run Locally](#How-to-Run-Locally)





## Introduction

The User Management System is a full-stack web application that allows users to register, login, and manage a list of users. It provides functionalities such as adding, updating, and deleting user profiles.

## Links

- **Backend**: [https://mindgurubackend.onrender.com](https://mindgurubackend.onrender.com)
- **Frontend**: [https://mindful-gurukul02.netlify.app/](https://mindful-gurukul02.netlify.app/)


## Features

- User registration and login
- View a list of users
- Search and filter users
- Sort users based on different fields
- View, update, and delete individual user profiles

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- State Management: React Hooks
- Styling: CSS, SweetAlert2

## API Endpoints

- **POST /User/Signup**: Register a new user.
- **POST /User/Login**: Authenticate and log in a user.
- **GET /User/All-Users**: Retrieve a list of users.
- **GET /User/:id**: Get a user by ID.
- **PUT /User/Update/:id**: Update a user by ID.
- **DELETE /User/Delete/:id**: Delete a user by ID.
- **POST /User/Add**: Add a new user (requires authentication).



## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/MSaifKhan01/MindGuru.git
   cd MindGuru
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set the  environment variables.
mongoUrl=your_Database
JWT_Secret=you_JwtSecret


4. Run the application:
   ```bash
   cd frontend
   npm start
   cd ../backend
   npm start
   ```

5. Access the application locally in your browser.

```

