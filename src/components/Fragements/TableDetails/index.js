import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

const TableDetail = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{`${data.title || ''} ${data.firstName} ${data.lastName}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>{data.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Date Of Birth</TableCell>
            <TableCell>{data.dateOfBirth}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gender</TableCell>
            <TableCell>{data.gender}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Phone</TableCell>
            <TableCell>{data.phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Photo</TableCell>
            <TableCell><img src={data.picture} alt={data.firstName} /></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableDetail