const express = require('express');
const controller1 = require('./controllers/employee');
const controller2 = require('./controllers/department');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/employee', controller1.getEmployee);
app.post('/createEmployee', controller1.addEmployee);
app.post('/updateEmployee', controller1.updateEmployee);
app.post('/deleteEmployee', controller1.deleteEmployee);

app.get('/department', controller2.getDepartment);
app.post('/createDepartment', controller2.addDepartment);
app.post('/updateDepartment', controller2.updateDepartment);
app.post('/deleteDepartment', controller2.deleteDepartment);

module.exports = app;
