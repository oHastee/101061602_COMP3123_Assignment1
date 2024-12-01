# Employee Management System

This project is a full-stack web application for managing employees. It allows users to perform CRUD (Create, Read, Update, Delete) operations, search for employees by various criteria, and manage user authentication.

## Technologies Used

- **Frontend**: React.js
  - Hosted on **Netlify** at: [Employee Management Frontend](https://fascinating-medovik-a5e6dc.netlify.app/)
- **Backend**: Node.js with Express
  - Hosted on **Render** at: [Employee Management Backend](https://one01061602-comp3123-assignment-backend.onrender.com)
- **Database**: MongoDB Atlas

---

## Features

- User authentication (Signup and Login).
- Add, view, update, and delete employees.
- Search employees by:
  - Name
  - Position
  - Department
- Responsive UI/UX using **Material-UI**.
- Breadcrumb navigation for better user experience.
- Fully integrated frontend and backend with API connectivity.

---

## How to Use

### Frontend
The frontend is hosted on Netlify and can be accessed [here](https://fascinating-medovik-a5e6dc.netlify.app/).

### Backend
The backend APIs are hosted on Render and can be accessed [here](https://one01061602-comp3123-assignment-backend.onrender.com).

### Database
The application uses MongoDB Atlas for database storage. The backend connects to this remote database using `MONGODB_URI_REMOTE`.

---

## API Endpoints

### User Routes
- **POST** `/api/v1/user/signup` - User signup.
- **POST** `/api/v1/user/login` - User login.

### Employee Routes
- **GET** `/api/v1/emp/employees` - Get all employees.
- **POST** `/api/v1/emp/employees` - Add a new employee.
- **GET** `/api/v1/emp/employees/:eid` - Get employee details by ID.
- **PUT** `/api/v1/emp/employees/:eid` - Update an employee.
- **DELETE** `/api/v1/emp/employees` - Delete an employee using the query parameter `eid`.
- **GET** `/api/v1/emp/employees/search` - Search employees by:
  - `name`
  - `position`
  - `department`

---

## Screenshots

Below are screenshots of the application:

### Signup Page
![Signup Page](./Screenshots/Signup_Page.png)

### Login Page
![Login Page](./Screenshots/Login_Page.png)

### Employee List Page
![Employee List Page](./Screenshots/EmployeeList_Page.png)

### AddEmployee Page
![AddEmployee Page](./Screenshots/AddEmployee_Page.png)

### Employee Details Page
![Employee Details Page](./Screenshots/EmployeeDetails_Page.png)

### Update Employee Page
![Update Employee Page](./Screenshots/UpdateEmployee_Page.png)

### Delete Popup
![Delete Popup](./Screenshots/Delete_Popup.png)

### Create Employee
![Create Employee](./Screenshots/createEmployee.png)

### Delete Employee
![Delete Employee](./Screenshots/deleteEmployee.png)

### Get All Employees
![Get All Employees](./Screenshots/getAllEmployees.png)

### Get Employee by ID
![Get Employee by ID](./Screenshots/getEmployeeById.png)

### Search by Department
![Search by Department](./Screenshots/Search_By_Department.png)

### Search by Name
![Search by Name](./Screenshots/Search_By_Name.png)

### Search by Position
![Search by Position](./Screenshots/Search_By_Position.png)

### Update Employee
![Update Employee](./Screenshots/updateEmployee.png)

### User Login Fail
![User Login Fail](./Screenshots/User_Login_Fail.png)

### User Login Pass
![User Login Pass](./Screenshots/User_Login_Pass.png)

### User Signup
![User Signup](./Screenshots/User_Signup.png)

### MongoDB Data
![MongoDB Data](./Screenshots/MongoDB_data.png)

### Netlify Deploy Log
![Netlify Deploy Log](./Screenshots/Netlify_DeployLog.png)

### Render Build Part 1
![Render Build Part 1](./Screenshots/RenderBuild_Part1.png)

### Render Build Part 2
![Render Build Part 2](./Screenshots/RenderBuild_Part2.png)

---

## How to Run Locally

1. Clone the repository: `git clone https://github.com/oHastee/101061602_COMP3123_Assignment1`
2. Navigate to the frontend and backend directories and install dependencies:
   - For frontend: `npm install`
   - For backend: `npm install`
3. Create `.env` files in both directories with appropriate configurations.
4. Start the backend server: `npm start` in the backend directory.
5. Start the frontend: `npm start` in the frontend directory.

---

## Deployment

### Frontend
The frontend is deployed using **Netlify**. Visit the [Netlify dashboard](https://app.netlify.com/) to manage the deployment.

### Backend
The backend is deployed using **Render**. Visit the [Render dashboard](https://dashboard.render.com/) to manage the deployment.

---

## Authors

This project was created by Oscar Piedrasanta Diaz as part of COMP3123 at George Brown College.

