const Department = require('../models/department');

const getDepartment = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json({ departments });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch departments.' });
  }
};

const addDepartment = async (req, res) => {
  const { d_id, d_name, d_mn } = req.body;
  try {
    const newDepartment = new Department({ d_id, d_name, d_mn });
    await newDepartment.save();
    res.status(201).json({ message: 'Department added successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add department.' });
  }
};

const updateDepartment = async (req, res) => {
  const { d_id, d_name, d_mn } = req.body;
  try {
    const updatedDepartment = await Department.findOneAndUpdate(
      { d_id },
      { d_name, d_mn },
      { new: true } // Return the updated document
    );
    res.json({ message: 'Department updated successfully.', updatedDepartment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update department.' });
  }
};

const deleteDepartment = async (req, res) => {
  const { d_id } = req.body;
  try {
    await Department.findOneAndDelete({ d_id });
    res.json({ message: 'Department deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete department.' });
  }
};

module.exports = { getDepartment, addDepartment, updateDepartment, deleteDepartment };
