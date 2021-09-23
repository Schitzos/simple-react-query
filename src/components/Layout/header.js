import { AppBar, Toolbar, Typography, IconButton, Menu, Link } from '@mui/material';
import { Box } from '@mui/system';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { DataContext } from '../../context';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { MenuItem } from '@material-ui/core';

const Header = () => {
  const { profile, setProfile, setSnackbar } = useContext(DataContext);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const ProfileMenuOpen = Boolean(anchorEl);

  const handleLogoutAction = () => {
    setSnackbar({
      isOpen: true,
      message: `Bye Bye ${profile.firstName}, see you soon!`,
      color: 'info'
    })
    setProfile(null);
    localStorage.clear();
    history.push('/login')
  }

  return (
    <>
      <Box component="div" sx={{ marginBottom: '2rem' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }}>
              <Link href="/" sx={{ color: 'white' }} underline="none">
                Simple React Query
              </Link>
            </Typography>
            <Toolbar
              sx={{ display: { sm: 'flex', xs: 'none' } }}
            >
            </Toolbar>
            <Typography>
              {profile.firstName}
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              color="inherit"
              component="span"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={ProfileMenuOpen}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleLogoutAction()}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box >
    </>
  )
}

export default Header