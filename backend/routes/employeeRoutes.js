const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// GET /api/v1/emp/employees
router.get('/employees', employeeController.getAllEmployees);

// POST /api/v1/emp/employees
router.post('/employees', employeeController.createEmployee);

// GET /api/v1/emp/employees/:eid
router.get('/employees/:eid', employeeController.getEmployeeById);

// PUT /api/v1/emp/employees/:eid
router.put('/employees/:eid', employeeController.updateEmployee);

// DELETE /api/v1/emp/employees
router.delete('/employees', employeeController.deleteEmployee);

// Route to handle employee search
router.get('/employees/search', employeeController.searchEmployees);



module.exports = router;



