const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  d_id: { type: Number, required: true, unique: true },
  d_name: { type: String, required: true },
  d_mn: { type: String, required: true }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
