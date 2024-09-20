import { Grid, Input, Typography, Button, IconButton, Select, MenuItem, Paper } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate hook for logout
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';

const DepartmentForm = ({ addDepartment, updateDepartment, data, isEdit }) => {
    const [d_id, setD_Id] = useState(0);
    const [d_name, setD_Name] = useState('');
    const [d_mn, setD_Mn] = useState('');
    const navigate = useNavigate(); 

    
    useEffect(() => {
        if (data) {
            setD_Id(data.d_id);
            setD_Name(data.d_name);
            setD_Mn(data.d_mn || '');
        } else {
            resetForm(); 
        }
    }, [data]);

    const resetForm = () => {
        setD_Id(0);
        setD_Name('');
        setD_Mn('');
    };

    const handleSubmit = async () => {
        if (!d_name || !d_mn) {
            alert('Please fill in all the required fields');
            return;
        }

        const department = { d_id, d_name, d_mn };
        try {
            if (isEdit) {
                // Update existing department
                await axios.post('http://localhost:5001/updateDepartment', department);
                updateDepartment(department); 
            } else {
                // Add new department
                await axios.post('http://localhost:5001/createDepartment', department);
                addDepartment(department); 
            }
            resetForm(); 
        } catch (error) {
            console.error('Error submitting department:', error);
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
                    {/* Home button and Logout */}
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
                            Department Registration
                        </Typography>
                    </Grid>

                    {/* Department ID */}
                    <Grid item xs={12}>
                        <Typography
                            component={'label'}
                            htmlFor='d_id'
                            sx={{ color: '#495057', fontSize: '16px', marginBottom: '10px', display: 'block' }}
                        >
                            Department ID
                        </Typography>
                        <Input
                            type='number'
                            id='d_id'
                            name='d_id'
                            fullWidth
                            sx={{
                                padding: '10px',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 0 8px rgba(0,0,0,0.1)',
                            }}
                            value={d_id}
                            onChange={(e) => setD_Id(Number(e.target.value))}
                        />
                    </Grid>

                    {/* Select Department */}
                    <Grid item xs={12}>
                        <Typography
                            component={'label'}
                            htmlFor='d_name'
                            sx={{ color: '#495057', fontSize: '16px', marginBottom: '10px', display: 'block' }}
                        >
                            Department
                        </Typography>
                        <Select
                            id='d_name'
                            value={d_name}
                            onChange={(e) => setD_Name(e.target.value)}
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

                    {/* Manager Name */}
                    <Grid item xs={12}>
                        <Typography
                            component={'label'}
                            htmlFor='d_mn'
                            sx={{ color: '#495057', fontSize: '16px', marginBottom: '10px', display: 'block' }}
                        >
                            Manager Name
                        </Typography>
                        <Input
                            type='text'
                            id='d_mn'
                            name='d_mn'
                            fullWidth
                            sx={{
                                padding: '10px',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 0 8px rgba(0,0,0,0.1)',
                            }}
                            value={d_mn}
                            onChange={(e) => setD_Mn(e.target.value)}
                        />
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

export default DepartmentForm;
