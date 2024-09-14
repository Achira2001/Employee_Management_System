import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const EmployeesTable = ({ employees, deleteEmployee, onEdit }) => {
    return (
        <TableContainer component={Paper} elevation={3} sx={{ marginTop: '20px', borderRadius: '12px', padding: '20px' }}>
            <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold', textAlign: 'center', color: '#495057' }}>
                Employee List
            </Typography>
            <Table sx={{ minWidth: 650, boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '12px' }} aria-label="employees table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#007bff' }}>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '16px' }}>Employee ID</TableCell>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '16px' }}>Employee Name</TableCell>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '16px' }}>Department</TableCell>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '16px' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee) => (
                        <TableRow
                            key={employee.id}
                            sx={{
                                '&:nth-of-type(odd)': { backgroundColor: '#f1f3f5' }, // alternate row color
                                '&:hover': { backgroundColor: '#f8f9fa' }, // hover effect on row
                            }}
                        >
                            <TableCell sx={{ fontSize: '14px', color: '#495057' }}>{employee.id}</TableCell>
                            <TableCell sx={{ fontSize: '14px', color: '#495057' }}>{employee.name}</TableCell>
                            <TableCell sx={{ fontSize: '14px', color: '#495057' }}>{employee.department}</TableCell>
                            <TableCell>
                                <IconButton aria-label="edit" onClick={() => onEdit(employee)} sx={{ color: '#007bff' }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => deleteEmployee(employee.id)} sx={{ color: '#ff0000' }}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EmployeesTable;
