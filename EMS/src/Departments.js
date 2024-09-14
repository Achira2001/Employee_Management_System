import { useState, useEffect } from 'react';
import DepartmentForm from './DepartmentForm';
import DepartmentsTable from './DepartmentsTable';
import axios from 'axios';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Fetch departments from backend
  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/department');
      setDepartments(response.data.departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [submitted]); // Re-fetch whenever `submitted` changes

  const addDepartment = () => {
    setSubmitted(true); // Trigger a re-fetch after adding a department
  };

  const updateDepartment = (updatedDepartment) => {
    setDepartments(
      departments.map((dep) => 
        dep.d_id === updatedDepartment.d_id ? updatedDepartment : dep
      )
    );
    setIsEdit(false);
    setCurrentDepartment(null);
    setSubmitted(!submitted); // Trigger re-fetch to get the latest data
  };

  const deleteDepartment = async (d_id) => {
    try {
      await axios.post('http://localhost:5000/deleteDepartment', { d_id });
      setDepartments(departments.filter((dep) => dep.d_id !== d_id));
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  const onEdit = (department) => {
    setCurrentDepartment(department);
    setIsEdit(true);
    setSubmitted(false); // Reset the submitted state
  };

  return (
    <div>
      <DepartmentForm
        addDepartment={addDepartment}
        updateDepartment={updateDepartment}
        data={currentDepartment}
        isEdit={isEdit}
      />
      <DepartmentsTable
        departments={departments}
        deleteDepartment={deleteDepartment}
        onEdit={onEdit}
      />
    </div>
  );
};

export default Departments;
