import { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeesTable from './EmployeesTable';
import axios from 'axios';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null); 
  const [isEdit, setIsEdit] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5001/employee');
        setEmployees(response.data.employees);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [submitted]);

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
    setSubmitted(true);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    setIsEdit(false);
    setCurrentEmployee(null);
    setSubmitted(true);
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.post('http://localhost:5001/deleteEmployee', { id });
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const onEdit = (employee) => {
    setCurrentEmployee(employee);
    setIsEdit(true);
    setSubmitted(false);
  };

  return (
    <div>
      <EmployeeForm
        addEmployee={addEmployee}
        updateEmployee={updateEmployee}
        submitted={submitted}
        data={currentEmployee}
        isEdit={isEdit}
      />
      <EmployeesTable
        employees={employees}
        deleteEmployee={deleteEmployee}
        onEdit={onEdit}
      />
    </div>
  );
};

export default Employees;
