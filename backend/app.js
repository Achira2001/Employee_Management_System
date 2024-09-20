const express = require('express');
const cors = require('cors');
const employeeController = require('./controllers/employee');
const departmentController = require('./controllers/department');
const signupController = require('./controllers/signup');
const loginController = require('./controllers/login');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Employee routes
app.get('/employee', employeeController.getEmployee);
app.post('/createEmployee', employeeController.addEmployee);
app.post('/updateEmployee', employeeController.updateEmployee);
app.post('/deleteEmployee', employeeController.deleteEmployee);

// Department routes
app.get('/department', departmentController.getDepartment);
app.post('/createDepartment', departmentController.addDepartment);
app.post('/updateDepartment', departmentController.updateDepartment);
app.post('/deleteDepartment', departmentController.deleteDepartment);

// User Authentication routes
app.post('/signup', signupController.signup);
app.post('/login', loginController.login);

module.exports = app;
