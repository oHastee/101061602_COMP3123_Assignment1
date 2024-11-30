
# User and Employee Management System

This project is a **User and Employee Management System** built using the **MERN stack** (MongoDB, Express.js, Node.js). It provides functionalities for user sign-up, login, and managing employees, such as adding, updating, retrieving, and deleting employee details. The project includes **input validation** using **express-validator** and stores data in a **MongoDB** database.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [MongoDB Access](#mongodb-access)
- [Author](#author)

---

## Features

- **User Registration**: Allows users to create an account with a username, email, and password.
- **User Login**: Users can log in using either their **email** or **username** along with the password.
- **Employee Management**:
  - Add new employees.
  - Retrieve the list of all employees.
  - Update employee details.
  - Delete an employee by ID.
- **Input Validation**: Uses **express-validator** to validate incoming requests.
- **MongoDB**: Stores user and employee data in a MongoDB database.

---

## Technologies

- **Node.js**: Backend framework.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and employee data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **express-validator**: Middleware for validating incoming requests.
- **bcrypt**: For password hashing.

---

## Setup Instructions

### **1. Clone the Repository**

```bash
git clone https://github.com/<your-github-username>/101061602_Comp3123_Assignment1.git
cd 101061602_Comp3123_Assignment1
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Set Up Environment Variables**

Create a `.env` file in the root directory and add the following variables:

```bash
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```

- Replace `<username>` and `<password>` with your MongoDB credentials.
- Set `JWT_SECRET` to any secure random string for JWT token generation (optional).

### **4. Run the Application**

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

---

## API Endpoints

### **User Management**

1. **User Signup**:
   - **Method**: `POST`
   - **Endpoint**: `/api/v1/user/signup`
   - **Description**: Allows users to create a new account.
   - **Request Body**:
     ```json
     {
       "username": "johndoe",
       "email": "johndoe@example.com",
       "password": "password123"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "User created successfully.",
       "user_id": "64c9e5a3d9f3c1a5c9b4e8a1"
     }
     ```

2. **User Login**:
   - **Method**: `POST`
   - **Endpoint**: `/api/v1/user/login`
   - **Description**: Allows users to log in using either their email or username.
   - **Request Body**:
     - Login with email:
       ```json
       {
         "email": "johndoe@example.com",
         "password": "password123"
       }
       ```
     - Login with username:
       ```json
       {
         "username": "johndoe",
         "password": "password123"
       }
       ```
   - **Response**:
     ```json
     {
       "message": "Login successful."
     }
     ```

### **Employee Management**

1. **Get All Employees**:
   - **Method**: `GET`
   - **Endpoint**: `/api/v1/emp/employees`
   - **Description**: Retrieve a list of all employees.
   - **Response**:
     ```json
     [
       {
         "employee_id": "64c9e5a3d9f3c1a5c9b4e8a2",
         "first_name": "Jane",
         "last_name": "Doe",
         "email": "jane.doe@example.com",
         "position": "Software Engineer",
         "salary": 90000,
         "date_of_joining": "2023-08-01T00:00:00Z",
         "department": "Engineering"
       }
     ]
     ```

2. **Create Employee**:
   - **Method**: `POST`
   - **Endpoint**: `/api/v1/emp/employees`
   - **Description**: Add a new employee.
   - **Request Body**:
     ```json
     {
       "first_name": "Alice",
       "last_name": "Johnson",
       "email": "alice.johnson@example.com",
       "position": "Designer",
       "salary": 85000,
       "date_of_joining": "2023-08-10T00:00:00Z",
       "department": "Design"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Employee created successfully.",
       "employee_id": "64c9e5a3d9f3c1a5c9b4e8a4"
     }
     ```

3. **Get Employee by ID**:
   - **Method**: `GET`
   - **Endpoint**: `/api/v1/emp/employees/{eid}`
   - **Description**: Get employee details by employee ID.
   - **Response**:
     ```json
     {
       "employee_id": "64c9e5a3d9f3c1a5c9b4e8a4",
       "first_name": "Alice",
       "last_name": "Johnson",
       "email": "alice.johnson@example.com",
       "position": "Designer",
       "salary": 85000,
       "date_of_joining": "2023-08-10T00:00:00Z",
       "department": "Design"
     }
     ```

4. **Update Employee**:
   - **Method**: `PUT`
   - **Endpoint**: `/api/v1/emp/employees/{eid}`
   - **Description**: Update employee details by employee ID.
   - **Request Body**:
     ```json
     {
       "position": "Senior Designer",
       "salary": 95000
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Employee details updated successfully."
     }
     ```

5. **Delete Employee**:
   - **Method**: `DELETE`
   - **Endpoint**: `/api/v1/emp/employees?eid={eid}`
   - **Description**: Delete an employee by ID.
   - **Response**:
     ```json
     {
       "message": "Employee deleted successfully."
     }
     ```

---

## Testing with Postman

You can test the API endpoints using **Postman**:

1. **Sign Up**: 
   - Use the **POST** method with the `/api/v1/user/signup` endpoint.
   - Provide the user details (`username`, `email`, `password`).

2. **Login**: 
   - Use the **POST** method with the `/api/v1/user/login` endpoint.
   - Test login with either **email** and password or **username** and password.

3. **Employee Operations**:
   - Add, retrieve, update, or delete employee records using the corresponding API endpoints.

---

## MongoDB Access

If you need to connect to the MongoDB database for testing or review:

- **Database Name**: `comp3123_assigment1`
- **MongoDB URI**:
  ```bash
  mongodb+srv://<username>:<password>@cluster0.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority
  ```
- **Credentials**: Replace `<username>` and `<password>` with your database credentials.

---

## Author

- **Name**: Oscar Piedrasanta Diaz
- **Email**: oscarpiediaz@gmail.com

Feel free to reach out for any further information!

---

### Notes:

- Ensure you properly secure your MongoDB connection string and credentials, especially when sharing the project.
- The project currently uses sample data. For production, make sure to hash passwords and secure the API with JWT authentication if necessary.
