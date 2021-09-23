import { Avatar, Container, Card, CardContent, Grid } from '@mui/material';
import { useMutation } from 'react-query';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormLogin from '../../components/Forms/LoginForm'
import * as actions from './action'
import { DataContext } from '../../context';
import { useContext } from 'react';
import { useHistory } from 'react-router';

const Home = () => {
  const { setProfile, setSnackbar } = useContext(DataContext);
  const history = useHistory();

  const fetchLogin = useMutation('login', actions.login,
    {
      onSuccess: (res) => {
        setProfile(res)
        setSnackbar({
          isOpen: true,
          message: `Hello ${res.firstName}, Welcome back !`,
          color: 'info'
        })
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

  const handleLogin = (value) => {
    fetchLogin.mutate(value);
  }


  const flexStyle = { display: 'flex', flexDirection: 'column' }

  return (
    <Container sx={{ ...flexStyle, height: '100vh', justifyContent: 'center' }}>
      <Grid container spacing={2}>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <Card>
            <CardContent sx={{ ...flexStyle, alignItems: "center", }}>
              <Avatar position='center' sx={{ bgcolor: '#f50057' }}>
                <LockOutlinedIcon />
              </Avatar>
              <FormLogin handleLogin={handleLogin} isLoading={fetchLogin.isLoading} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container >
  )
}

export default Home