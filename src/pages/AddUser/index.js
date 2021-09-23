import { Container, Card, CardContent, Grid } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import AddUserForm from '../../components/Forms/AddUserForm'
import * as actions from './action'
import { DataContext } from '../../context';
import { useContext } from 'react';
import { useHistory } from 'react-router';

const AddUser = () => {
  const { setSnackbar } = useContext(DataContext);
  const history = useHistory();
  // const queryClient = useQueryClient();

  const fetchAddUser = useMutation('addUser', actions.addUser,
    {
      onSuccess: (res) => {
        setSnackbar({
          isOpen: true,
          message: `Success adding new user`,
          color: 'info'
        })
        // queryClient.invalidateQueries('getAllUser')
        history.push('/');
      },
      onError: (error) => {
        setSnackbar({
          isOpen: true,
          message: error.response.data.error,
          color: 'error'
        })
      },
    });

  const handleSubmitForm = (value) => {
    fetchAddUser.mutate(value);
  }

  const flexStyle = { display: 'flex', flexDirection: 'column' }

  return (
    <Container sx={{ ...flexStyle, justifyContent: 'center' }}>
      <Grid container spacing={2}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Card>
            <CardContent sx={{ ...flexStyle, alignItems: "center", }}>
              Add New User
              <AddUserForm handleSubmitForm={handleSubmitForm} isLoading={fetchAddUser.isLoading} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container >
  )
}

export default AddUser