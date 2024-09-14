import { Grid, Input, Typography, Button, Select, MenuItem, IconButton, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Home } from '@mui/icons-material'; // Import Home icon
import { Link } from 'react-router-dom'; // Assuming you're using react-router

const EmployeeForm = ({ addEmployee, updateEmployee, data, isEdit }) => {
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');

    useEffect(() => {
        if (data) {
            setId(data.id);
            setName(data.name);
            setDepartment(data.department || '');
        } else {
            resetForm(); // Reset form when not editing
        }
    }, [data]);

    const resetForm = () => {
        setId(0);
        setName('');
        setDepartment('');
    };

    const handleSubmit = async () => {
        const employee = { id, name, department };
        try {
            if (isEdit) {
                // Update existing employee
                await axios.post('http://localhost:5000/updateEmployee', employee);
                updateEmployee(employee); // Trigger update in EmployeesTable
            } else {
                // Add new employee
                await axios.post('http://localhost:5000/createEmployee', employee);
                addEmployee(employee); // Trigger refresh in EmployeesTable
            }
            resetForm();
        } catch (error) {
            console.error('Error submitting employee:', error);
        }
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: '100vh', backgroundColor: '#f1f3f5' }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: '40px',
                    borderRadius: '15px',
                    backgroundColor: '#f8f9fa',
                    maxWidth: '600px',
                    width: '100%',
                }}
            >
                <Grid container spacing={4}>
                    {/* Home button positioned at the top */}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Link to='/'>
                            <IconButton color='primary' aria-label='home'>
                                <Home />
                            </IconButton>
                        </Link>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography
                            component={'h1'}
                            sx={{ color: '#495057', fontWeight: 'bold', fontSize: '28px', textAlign: 'center' }}
                        >
                            Employee Registration
                        </Typography>
                    </Grid>

                    {/* Employee ID Field */}
                    <Grid item xs={12}>
                        <Typography
                            component={'label'}
                            htmlFor='id'
                            sx={{ color: '#495057', fontSize: '16px', marginBottom: '10px', display: 'block' }}
                        >
                            Employee ID
                        </Typography>
                        <Input
                            type='number'
                            id='id'
                            name='id'
                            fullWidth
                            sx={{
                                padding: '10px',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 0 8px rgba(0,0,0,0.1)',
                            }}
                            value={id}
                            onChange={(e) => setId(Number(e.target.value))}
                        />
                    </Grid>

                    {/* Employee Name Field */}
                    <Grid item xs={12}>
                        <Typography
                            component={'label'}
                            htmlFor='name'
                            sx={{ color: '#495057', fontSize: '16px', marginBottom: '10px', display: 'block' }}
                        >
                            Employee Name
                        </Typography>
                        <Input
                            type='text'
                            id='name'
                            name='name'
                            fullWidth
                            sx={{
                                padding: '10px',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 0 8px rgba(0,0,0,0.1)',
                            }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>

                    {/* Department Select Field */}
                    <Grid item xs={12}>
                        <Typography
                            component={'label'}
                            htmlFor='department'
                            sx={{ color: '#495057', fontSize: '16px', marginBottom: '10px', display: 'block' }}
                        >
                            Department
                        </Typography>
                        <Select
                            id='department'
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            displayEmpty
                            fullWidth
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 0 8px rgba(0,0,0,0.1)',
                            }}
                        >
                            <MenuItem value="">
                                <em>Select Department</em>
                            </MenuItem>
                            <MenuItem value={'HR'}>Human Resource Department</MenuItem>
                            <MenuItem value={'Engineering'}>Engineering Department</MenuItem>
                            <MenuItem value={'Finance'}>Finance Department</MenuItem>
                            <MenuItem value={'IT'}>IT Department</MenuItem>
                            <MenuItem value={'Sales'}>Sales Department</MenuItem>
                        </Select>
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Button
                            sx={{
                                backgroundColor: '#007bff',
                                color: '#ffffff',
                                padding: '12px 24px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                borderRadius: '8px',
                                '&:hover': { backgroundColor: '#0056b3' },
                            }}
                            onClick={handleSubmit}
                        >
                            {isEdit ? 'UPDATE' : 'ADD'}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default EmployeeForm;
