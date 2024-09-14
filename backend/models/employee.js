const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mob_num : { type: Number, required: true },
  department: { type: String, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);






module.exports = Employee;

