import { Alert, Snackbar, Container } from '@mui/material';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { DataContext } from '../../context';
import Header from './header';

const Layout = ({ children }) => {
  const { profile, snackbar, setSnackbar } = useContext(DataContext);
  const history = useHistory();

  useEffect(() => {
    if (!profile) {
      history.push('/login');
    }
  }, [history, profile]);

  useEffect(() => {
    const hideSnackBar = () => {
      setTimeout(() => {
        setSnackbar({
          isOpen: false,
        })
      }, 10000);
    }
    hideSnackBar()
  }, [snackbar, setSnackbar]);

  return (
    <>
      {profile && <Header />}
      <Container>
        {children}
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={snackbar.isOpen}
      >
        <Alert severity={snackbar.color}      >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </>
  )
}

export default Layout