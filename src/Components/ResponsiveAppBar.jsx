import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
import {  logIn,logOut } from '../Store/LoginSlice';
const pages = [
  { name: 'View Projects', path: '/projects' },
  { name: 'Login', path: '/Login' },
];
function ResponsiveAppBar() {
  const dispatch = useDispatch( );
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector(state => state.login);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ width: '100%', background: '#66BB6A   ' }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <img src="./src/assets/logo.png" alt="Logo" style={{ height: 80, marginRight: 8, display: 'flex' }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.path} onClick={() => navigate(page.path)}>
                <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                </MenuItem>

              ))}
            </Menu>
          </Box>
    
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
      
              <Button
               key={page.name}
               onClick={() => navigate(page.path)}
               sx={{ my: 2, color: 'white', display: 'block' }}
              >
              {page.name}
              </Button>

            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.userFirstName || "User"} src={user.avatar || "/static/images/avatar/2.jpg"} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box sx={{ px: 2, py: 1.5, bgcolor: '#f5f5f5' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#333' }}>User Details:</Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>{user.userFirstName || "Guest"}</Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>{user.userLastName || ""}</Typography>
              </Box>
              <Divider />
              <MenuItem key="LogIn" onClick={() => navigate(`/Login` )}>
                  <Typography sx={{ textAlign: 'center' }}>{"Login"}</Typography>
                </MenuItem>
                <MenuItem key="LogOut()" onClick={() => dispatch(logOut()) }>
                  <Typography sx={{ textAlign: 'center' }}>{"Logout"}</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;