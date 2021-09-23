import { Box, Button, } from '@mui/material';

const columns = (handleDetailUser, hadnleEditUser, handleDeleteUser) => {
  const data = [
    { field: 'firstName', headerName: 'First name', flex: 0.5, sortable: false },
    { field: 'lastName', headerName: 'Last name', flex: 0.5, sortable: false },
    { field: 'id', headerName: 'ID', editable: true, flex: 1, sortable: false },
    {
      field: 'picture', headerName: 'Picture', flex: 0.5, sortable: false,
      renderCell: (params) => {
        return (<img src={params.row.picture || 'https://randomuser.me/api/portraits/med/women/93.jpg'} alt={params.row.firstName} width="30%" />)
      }
    },
    {
      field: 'action', headerName: 'Action', flex: 1, sortable: false, headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Button variant="contained"
              color="primary" size="small" sx={{ textTransform: 'none !important' }}
              onClick={() => handleDetailUser(params.row.id)}>
              Detail
            </Button>
            <Button variant="contained"
              color="info" size="small" sx={{ textTransform: 'none !important' }}
              onClick={() => hadnleEditUser(params.row.id)}>
              Edit
            </Button>
            <Button variant="contained"
              color="secondary" size="small" sx={{ textTransform: 'none !important' }}
              onClick={() => handleDeleteUser(params.row)}>
              Delete
            </Button>
          </Box>
        )
      }
    },
  ];
  return data;
}

const constant = {
  columns,
};

export default constant;
