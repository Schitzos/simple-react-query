export const columns = [
  {
    field: 'firstName',
    headerName: 'First name',
    editable: true,
    flex: 1,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    editable: true,
    flex: 1,
  },
  {
    field: 'id',
    headerName: 'ID',
    type: 'number',
    editable: true,
    flex: 1,
  },
  {
    field: 'picture',
    headerName: 'Picture',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 0.5,
    renderCell: (params) => {
      return (<img src={params.row.picture || 'https://randomuser.me/api/portraits/med/men/48.jpg'} alt={params.row.firstName} width="30%" />)
    }
  },
];
