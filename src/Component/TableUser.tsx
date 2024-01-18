import React from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TableUser = () => {
  const submittedUsers = useSelector((state: any) => state?.form?.submittedUsers);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: 'lightgreen', borderBottom: '2px solid black' }}>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Sex</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Gov ID Type</TableCell>
            <TableCell>Gov ID</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>State</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Pincode</TableCell>
            {/* Add other table headers based on your user structure */}
          </TableRow>
        </TableHead>
        <TableBody>
          {submittedUsers.length ? submittedUsers.map((user: any) => (
            <TableRow key={user.id} style={{ backgroundColor: 'lightgrey', borderBottom: '1px solid grey' }}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.sex}</TableCell>
              <TableCell>{user.mobile}</TableCell>
              <TableCell>{user.govIdType}</TableCell>
              <TableCell>{user.govId}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.state}</TableCell>
              <TableCell>{user.city}</TableCell>
              <TableCell>{user.country}</TableCell>
              <TableCell>{user.pincode}</TableCell>
              {/* Add other table cells based on your user structure */}
            </TableRow>
          )):"No Data Submitted"}
        </TableBody>    
      </Table>
    </TableContainer>
  );
};

export default TableUser;
