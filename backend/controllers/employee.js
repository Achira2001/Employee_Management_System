const Employee = require('../models/employee');

const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({ employees });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees.' });
  }
};

const addEmployee = async (req, res) => {
  const { id, name, email, mob_num, department } = req.body;
  try {
    const newEmployee = new Employee({ id, name, email, mob_num, department });
    await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add employee.' });
  }
};

const updateEmployee = async (req, res) => {
  const { id, name, email, mob_num, department } = req.body;
  try {
    await Employee.findOneAndUpdate({ id }, { name, email, mob_num, department });
    res.json({ message: 'Employee updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update employee.' });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.body;
  try {
    await Employee.findOneAndDelete({ id });
    res.json({ message: 'Employee deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete employee.' });
  }
};

module.exports = { getEmployee, addEmployee, updateEmployee, deleteEmployee };
