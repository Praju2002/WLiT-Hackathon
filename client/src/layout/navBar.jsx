import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Menu as MenuIcon, Home, Search, Favorite, PlaylistPlay } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import img from '../assets/logo.png';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        backgroundColor: '#d4edf9',
        height: '100%',
        color: 'black',
        padding: 2,
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <List>
        {[{ text: 'Home', icon: <Home /> }, { text: 'Search', icon: <Search /> }, { text: 'My Favorites', icon: <Favorite /> }, { text: 'Playlists', icon: <PlaylistPlay /> }].map(
          (item, index) => (
            <ListItem button key={index} component={item.text === 'Search' ? Link : 'div'} to={item.text === 'Search' ? '/search' : '#'} sx={{ '&:hover': { backgroundColor: 'white', borderRadius: '10px' } }}>
              {item.icon}
              <ListItemText primary={item.text} sx={{ color: 'black', fontFamily: 'Poppins, sans-serif', marginLeft: '15px' }} />
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={img} alt="logo" style={{ width: '80px', height: 'auto' }} />
            <Typography
              variant="h6"
              sx={{
                marginLeft: 2,
                color: '#333',
                fontWeight: 'bold',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              SootheSphere
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>

      <Box sx={{ mt: 8, padding: 0 }}>
        {/* Page Content Goes Here */}
      </Box>
    </>
  );
};

export default NavBar;
