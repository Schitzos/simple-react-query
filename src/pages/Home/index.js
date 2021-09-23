import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as actions from './action'
import { Modal, Box, Card, Grid, CardContent, Button, Typography } from '@mui/material';
import { DataContext } from '../../context';
import { useContext } from 'react';
import { modalStyle } from './css';
import AddUserForm from '../../components/Forms/AddUserForm'
import TableDetails from '../../components/Fragements/TableDetails'
import constant from './constant';

const Home = () => {
  const [page, setPage] = useState(1);
  const [modalAddUser, setModalAddUser] = useState(false)
  const [modalDetail, setModalDetail] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [formMode, setFormMode] = useState('add')
  const [tempData, setTempData] = useState({})
  const [limit] = useState(10);
  const { setSnackbar } = useContext(DataContext);
  const queryClient = useQueryClient();
  let selectedDataId

  const fetchAllUser = useQuery(['getAllUser', page, limit], () => actions.fetchAllUser(page, limit),
    {
      cacheTime: 60 * 1000,
      initialData: { data: [], total: 0, limit: 0, },
      keepPreviousData: true,
      onError: (error) => {
        setSnackbar({ isOpen: true, message: error.response.data.error, color: 'error' })
      },
      // refetchOnWindowFocus: false,
    }
  );

  const fetchAddUser = useMutation('addUser', actions.addUser,
    {
      onSuccess: () => {
        setSnackbar({ isOpen: true, message: `Success adding new user`, color: 'info' })
        queryClient.invalidateQueries('getAllUser')
        setModalAddUser(false)
      },
      onError: (error) => {
        setSnackbar({ isOpen: true, message: error.response.data.error, color: 'error' })
      },
    });

  const fetchEditUser = useMutation('EditUser', actions.editUser,
    {
      onSuccess: () => {
        setSnackbar({ isOpen: true, message: `Success edit user`, color: 'info' })
        queryClient.invalidateQueries('getAllUser')
        setModalAddUser(false)
      },
      onError: (error) => {
        setSnackbar({ isOpen: true, message: error.response.data.error, color: 'error' })
      },
    });

  const fetchDetailUser = useQuery(['detailUser', selectedDataId], () => actions.detailUser(selectedDataId),
    {
      enabled: !!selectedDataId,
      onError: (error) => {
        setModalDetail(true)
        setSnackbar({ isOpen: true, message: error.response.data.error, color: 'error' })
      },
    });

  const fetchDeleteUser = useMutation('deleteUser', actions.deleteUser,
    {
      onSuccess: () => {
        setSnackbar({ isOpen: true, message: `Success delete user`, color: 'info' })
        queryClient.invalidateQueries('getAllUser')
        setModalDelete(false)
        setTempData({})
      },
      onError: (error) => {
        setModalDelete(false)
        setSnackbar({ isOpen: true, message: error.response.data.error, color: 'error' })
      },
    });

  const changePage = (val) => {
    setPage(val + 1);
  };

  const handleSubmitForm = (value) => {
    fetchAddUser.mutate(value);
  }

  const handleDetailUser = (value) => {
    selectedDataId = value
    setModalDetail(true)
    fetchDetailUser.refetch()
  }

  const handleDeleteUser = (value) => {
    setTempData(value)
    setModalDelete(true)
  }

  const confirmDeleteUser = () => {
    fetchDeleteUser.mutate(tempData.id)
  }

  const handleEditUser = (value) => {
    selectedDataId = value
    fetchDetailUser.refetch()
    setFormMode('edit')
    setModalAddUser(true)
  }

  const hanldeEditForm = (value) => {
    fetchEditUser.mutate(value);
  }

  const handleModalUserClose = () => {
    setModalAddUser(false)
    setFormMode('add')
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4} >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setModalAddUser(true)}
            sx={{ marginBottom: '1rem' }}
          >
            Add User
          </Button>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              autoHeight
              checkboxSelection={false}
              rows={fetchAllUser.data.data}
              rowCount={fetchAllUser.data.total}
              columns={constant.columns(handleDetailUser, handleEditUser, handleDeleteUser)}
              pageSize={limit}
              loading={fetchAllUser.isFetching}
              fullWidth
              paginationMode='server'
              onPageChange={(e) => changePage(e)}
              disableColumnFilter
            />
          </div>
        </Grid >
      </Grid>
      <Modal
        open={modalAddUser}
        onClose={() => handleModalUserClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Card sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {formMode === 'add' ? 'Add New' : 'Edit'} User
          </Typography>
          <CardContent>
            <AddUserForm
              mode={formMode}
              handleSubmitForm={handleSubmitForm}
              hanldeEditForm={hanldeEditForm}
              isLoading={formMode === 'add' ? fetchAddUser.isLoading : fetchEditUser.isLoading}
              isFetching={fetchDetailUser.isFetching}
              data={fetchDetailUser.data}
            />
          </CardContent>
        </Card>
      </Modal>
      <Modal
        open={modalDetail}
        onClose={() => setModalDetail(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Card sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Detail User
          </Typography>
          <CardContent>
            {!fetchDetailUser.isFetching &&
              <TableDetails data={fetchDetailUser.data} />}
          </CardContent>
        </Card>
      </Modal>
      <Modal
        open={modalDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Card sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete User
          </Typography>
          <CardContent>
            <Typography id="modal-modal-title" component="span" sx={{ fontSize: '.75rem' }}>
              Are you sure wanna delete {tempData.firstName} from the list ?
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '60%', margin: '0 auto', marginTop: '1rem', }}>
              <Button
                disabled={fetchDeleteUser.isLoading}
                variant="contained"
                color="secondary"
                onClick={() => setModalDelete(false)}
                sx={{ marginBottom: '1rem' }}
              >
                Cancel
              </Button>
              <Button
                disabled={fetchDeleteUser.isLoading}
                variant="contained"
                color="primary"
                onClick={() => confirmDeleteUser()}
                sx={{ marginBottom: '1rem' }}
              >
                Confirm
              </Button>
            </Box>
            {fetchDeleteUser.isLoading && 'Loading ...'}
          </CardContent>
        </Card>
      </Modal>
    </>
  )
}

export default Home