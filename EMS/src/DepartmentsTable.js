import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const DepartmentsTable = ({ departments, deleteDepartment, onEdit }) => {
    return (
        <TableContainer component={Paper} elevation={3} sx={{ marginTop: '20px', borderRadius: '12px', padding: '20px' }}>
            <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold', textAlign: 'center', color: '#495057' }}>
                Department List
            </Typography>
            <Table sx={{ minWidth: 650, boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '12px' }} aria-label="departments table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#007bff' }}>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '16px' }}>Department ID</TableCell>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '16px' }}>Department Name</TableCell>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '16px' }}>Manager Name</TableCell>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '16px' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {departments.map((department) => (
                        <TableRow
                            key={department.d_id}
                            sx={{
                                '&:nth-of-type(odd)': { backgroundColor: '#f1f3f5' }, 
                                '&:hover': { backgroundColor: '#f8f9fa' },
                            }}
                        >
                            <TableCell sx={{ fontSize: '14px', color: '#495057' }}>{department.d_id}</TableCell>
                            <TableCell sx={{ fontSize: '14px', color: '#495057' }}>{department.d_name}</TableCell>
                            <TableCell sx={{ fontSize: '14px', color: '#495057' }}>{department.d_mn}</TableCell>
                            <TableCell>
                                <IconButton aria-label="edit" onClick={() => onEdit(department)} sx={{ color: '#007bff' }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => deleteDepartment(department.d_id)} sx={{ color: '#ff0000' }}>
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

export default DepartmentsTable;
