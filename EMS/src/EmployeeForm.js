import { Grid, Input, Typography, Button, Select, MenuItem, IconButton, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Home } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const EmployeeForm = ({ addEmployee, updateEmployee, data, isEdit }) => {
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mob_num, setMob_num] = useState('');
    const [department, setDepartment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setId(data.id);
            setName(data.name);
            setEmail(data.email);
            setMob_num(data.mob_num);
            setDepartment(data.department || '');
        } else {
            resetForm(); 
        }
    }, [data]);

    const resetForm = () => {
        setId(0);
        setName('');
        setEmail('');
        setMob_num('');
        setDepartment('');
    };

    const handleSubmit = async () => {
        if (!name || !email || !mob_num || !department) {
            alert("Please fill out all the required fields");
            return;
        }

        const employee = { id, name, email, mob_num, department };

        try {
            if (isEdit) {
                // Update existing employee
                await axios.post('http://localhost:5001/updateEmployee', employee);
                updateEmployee(employee);
            } else {
                // Add new employee
                await axios.post('http://localhost:5001/createEmployee', employee);
                addEmployee(employee); 
            }
            resetForm();
        } catch (error) {
            console.error('Error submitting employee:', error);
        }
    };

    const handleLogout = () => {
        navigate('/');
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
                    {/* Home button and logout  */}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Link to='/App'>
                            <IconButton color='primary' aria-label='home'>
                                <Home />
                            </IconButton>
                        </Link>

                        <IconButton color='primary' aria-label='logout' onClick={handleLogout}>
                                <LogoutIcon />
                        </IconButton>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography
                            component={'h1'}
                            sx={{ color: '#495057', fontWeight: 'bold', fontSize: '28px', textAlign: 'center' }}
                        >
                            Employee Registration
                        </Typography>
                    </Grid>

                    {/* ID Field */}
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

                    {/* Name Field */}
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

                    {/* Email Field */}
                    <Grid item xs={12}>
                        <Typography
                            component={'label'}
                            htmlFor='email'
                            sx={{ color: '#495057', fontSize: '16px', marginBottom: '10px', display: 'block' }}
                        >
                            Employee Email
                        </Typography>
                        <Input
                            type='text'
                            id='email'
                            name='email'
                            fullWidth
                            sx={{
                                padding: '10px',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 0 8px rgba(0,0,0,0.1)',
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>

                    {/* Mobile Number */}
                    <Grid item xs={12}>
                        <Typography
                            component={'label'}
                            htmlFor='mob_num'
                            sx={{ color: '#495057', fontSize: '16px', marginBottom: '10px', display: 'block' }}
                        >
                            Employee Mobile Number
                        </Typography>
                        <Input
                            type='number'
                            id='mob_num'
                            name='mob_num'
                            fullWidth
                            sx={{
                                padding: '10px',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 0 8px rgba(0,0,0,0.1)',
                            }}
                            value={mob_num}
                            onChange={(e) => setMob_num(Number(e.target.value))}
                        />
                    </Grid>

                    {/* Select Department */}
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
