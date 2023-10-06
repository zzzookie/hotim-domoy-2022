import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Box, Menu, Avatar, Container, Button, Tooltip, MenuItem, IconButton, Typography, Stack } from '@mui/material';
import { AddCircle, Menu as MenuIcon } from '@mui/icons-material';

import { UserContext } from '../../context/user';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function Navbar() {
  const { user, handleLogout } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const pages = ['Потеряшки', 'Найдёныши', 'Каталог'];
  const pagesLinks = ['lost', 'found', 'catalog'];
  const settings = user?.id
    ? ['Профиль', 'Избранное', 'Выйти']
    : ['Профиль', 'Выйти'];
  const settingsLinks = user?.id
    ? ['profile', 'profile/favor', 'logout']
    : ['profile', 'logout'];

  const navLink = (pagesLinksArrNumber) => {
    setAnchorElNav(null);
    window.location.replace(`/${pagesLinks[pagesLinksArrNumber]}`);
  };

  const navSettings = (settingsLinksArrNumber) => {
    setAnchorElUser(null);
    if (settingsLinks[settingsLinksArrNumber] === "logout") {
      handleLogout();
    }
    navigate(`/${settingsLinks[settingsLinksArrNumber]}`);
  };

  return (
    <AppBar className="navbar" position="static">
      <Container maxWidth="xl">
        <Toolbar className="navbar-content" disableGutters>

          <Stack className="logo" sx={{ alignItems: 'center', flexGrow: 0, display: { xs: 'none', md: 'flex' } }} direction="row" spacing={2}>
            <Box component="a" onClick={() => navigate('/')} sx={{ cursor: "pointer" }}>
              <img src="/iconW24.png" alt="logo" width="24" height="24" />
            </Box>
            <Typography variant="h6" noWrap component="a" onClick={() => navigate('/')} sx={{ cursor: 'pointer', mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
              ХОТИМ ДОМОЙ
            </Typography>
          </Stack>

          <Box sx={{ flexGrow: 1, alignItems: 'center', display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={(e) => setAnchorElNav(e.currentTarget)} color="inherit">
              <MenuIcon />
            </IconButton>

            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={() => setAnchorElNav(null)} sx={{ display: { xs: 'block', md: 'none' } }}>
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={(e) => navLink(index)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Box>
              <img src="/iconW24.png" alt="logo" width="24" height="24" style={{ marginRight: ".5rem" }} />
            </Box>
            <Typography onClick={() => navigate('/')} variant="h5" noWrap component="a" href="" sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
              ХОТИМ ДОМОЙ
            </Typography>
          </Box>

          <Box className="nav-menu" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button key={page} onClick={(e) => navLink(index)} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>

          <Stack className="nav-buttons" sx={{ flexGrow: 0 }} direction="row" spacing={2}>
            {window.location.pathname.includes('auth')
              ? null
              : (
                <>
                  <Button onClick={() => navigate('/newpost')} sx={{ display: { xs: 'none', sm: 'none', lg: 'inline-flex' } }} variant="contained" color="secondary" startIcon={<AddCircle />}>Подать объявление</Button>
                  <IconButton onClick={() => navigate('/newpost')} sx={{ display: { sm: 'inline-flex', lg: 'none' } }} aria-label="Add new post"><AddCircle sx={{ color: "#fff" }} /></IconButton>
                  {user?.id
                    ? (
                      <Box className="navbar-avatar" sx={{ flexGrow: 0 }}>
                        <Tooltip title="Профиль">
                          <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                            <Avatar alt={user?.name || 'A'} src={user.user_photo ? `${BASE_URL}${user.user_photo}` : null} width="40" height="40" />
                          </IconButton>
                        </Tooltip>
                        <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={Boolean(anchorElUser)} onClose={() => setAnchorElUser(null)}>
                          {settings.map((setting, index) => (
                            <MenuItem key={setting} onClick={(e) => navSettings(index)}>
                              <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                          ))}
                        </Menu>
                      </Box>
                    )
                    : <Button onClick={() => navigate('/auth')} variant="text" className="auth-button" sx={{ color: 'white' }}>Войти</Button>}
                </>
              )}
          </Stack>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
