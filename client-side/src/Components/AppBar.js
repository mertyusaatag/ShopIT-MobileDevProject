import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import CartDialog from "./Cart"
import MenuItem from '@mui/material/MenuItem';
import { GUEST_LEVEL, ADMIN_LEVEL } from '../config/global_constants';
import logo_transparent from "../Images/logo_transparent.png";
import CategoriesList from './CategoriesList';


const TopAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isUserLogged, setUserLogged] = useState(false);
  const [settings, setSettings] = useState([])
  const [userImg, setImg] = useState(null)


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

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      if (user.accessLevel > GUEST_LEVEL) {
        setUserLogged(true)
        setSettings([{ label: 'Profile', route: '/profile' },
        { label: 'Orders', route: '/userOrders' },
        { label: 'Log out', route: '/logout' }])
        setImg(user.img)
        if (user.accessLevel === ADMIN_LEVEL) {
          setSettings(settings => [...settings, { label: 'Admin Panel', route: '/admin' }])
        }

      } else {
        setUserLogged(false)
        setSettings([{ label: 'Log in', route: '/login' },
        { label: 'Sign up', route: '/signup' }])
      }
    } else {
      setUserLogged(false)
      setSettings([{ label: 'Log in', route: '/login' },
      { label: 'Sign up', route: '/signup' }])
      const user = {
        name: "GUEST",
        accessLevel: 0
      }
      const cart = []
      localStorage.setItem("cart", JSON.stringify(cart))
      localStorage.setItem("user", JSON.stringify(user))
    }
  }, [])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/homepage"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <img src={logo_transparent} alt="ShopIT" height={50} width={150} />
          </Typography>

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
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem component={Link} key="homepage" to="/homepage" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Homepage</Typography>
              </MenuItem>
              <CategoriesList />
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/homepage"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img src={logo_transparent} alt="ShopIT" height={50} width={150} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton size="large" aria-label="shopping-cart" color="inherit">
              <CartDialog />
            </IconButton>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={!userImg ? "/static/images/avatar/2.jpg" : `data:;base64,${userImg}`} />
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
              {settings.map((setting) => (
                <MenuItem component={Link} key={setting.label} to={setting.route} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopAppBar;