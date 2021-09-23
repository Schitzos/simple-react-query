import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as actions from './action'
import { Box, Modal, Card, CardContent, Button, Typography } from '@mui/material';
import { DataContext } from '../../context';
import { useContext } from 'react';
import { columns } from './constant';
import { modalStyle } from './css';
import AddUserForm from '../../components/Forms/AddUserForm'

const Home = () => {
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false)
  const [limit] = useState(10);
  const { setSnackbar } = useContext(DataContext);
  const queryClient = useQueryClient();

  const fetchAllUser = useQuery(['getAllUser', page, limit], () => actions.fetchAllUser(page, limit),
    {
      cacheTime: 60 * 1000,
      // staleTime: 1 * 1000,
      initialData: {
        data: [],
        total: 0,
        limit: 0,
      },
      keepPreviousData: true,
      onError: (error) => {
        setSnackbar({
          isOpen: true,
          message: error.response.data.error,
          color: 'error'
        })
      },
    }
  );

  const fetchAddUser = useMutation('addUser', actions.addUser,
    {
      onSuccess: () => {
        setSnackbar({
          isOpen: true,
          message: `Success adding new user`,
          color: 'info'
        })
        queryClient.invalidateQueries('getAllUser')
        setOpenModal(false)
      },
      onError: (error) => {
        setSnackbar({
          isOpen: true,
          message: error.response.data.error,
          color: 'error'
        })
      },
    });

  const changePage = (val) => {
    setPage(val + 1);
  };

  const handleSubmitForm = (value) => {
    fetchAddUser.mutate(value);
  }

  return (
    <Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpenModal(true)}
      >
        Add User
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          autoHeight
          checkboxSelection={false}
          disableMultipleSelection={true}
          rows={fetchAllUser.data.data}
          rowCount={fetchAllUser.data.total}
          columns={columns}
          pageSize={limit}
          disableExtendRowFullWidth={false}
          loading={fetchAllUser.isFetching}
          fullWidth
          disableColumnResize={true}
          paginationMode='server'
          onPageChange={(e) => changePage(e)}
        />
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new User
          </Typography>
          <CardContent>
            <AddUserForm handleSubmitForm={handleSubmitForm} isLoading={fetchAddUser.isLoading} />
          </CardContent>
        </Card>
      </Modal>
    </Box>
  )
}

export default Home