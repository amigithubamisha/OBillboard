// Sidebar.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import UserIcon from '@mui/icons-material/Person';
import AdIcon from '@mui/icons-material/Star';
import ContactIcon from '@mui/icons-material/ContactMail';
import Home from './Home';
import User from './pages/User';
import Advertisements from './pages/Advertisements';
import Contact from './pages/Contact';
import './Sidebar.css';

const drawerWidth = 240;

const Sidebar = () => {
  const [menudata, setMenudata] = useState('Home');
  const handleMenuClick = (menuItem) => {
    setMenudata(menuItem);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <MuiDrawer
        variant="permanent"
        sx={{
          width: {
            xs: '100%', // Full width on extra small devices
            sm: `${drawerWidth}px`, // Adjust based on your design for small devices and up
          },
          flexShrink: 0,
          marginTop: '64px', // Adjust marginTop based on your Navbar height
        }}
      >
        <List>
          <ListItemButton onClick={() => handleMenuClick('Home')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton onClick={() => handleMenuClick('User')}>
            <ListItemIcon>
              <UserIcon />
            </ListItemIcon>
            <ListItemText primary="User" />
          </ListItemButton>
          <ListItemButton onClick={() => handleMenuClick('Advertisement')}>
            <ListItemIcon>
              <AdIcon />
            </ListItemIcon>
            <ListItemText primary="Advertisement" />
          </ListItemButton>
          <ListItemButton onClick={() => handleMenuClick('ContactUs')}>
            <ListItemIcon>
              <ContactIcon />
            </ListItemIcon>
            <ListItemText primary="Contact Us" />
          </ListItemButton>
        </List>
      </MuiDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {menudata === 'Home' && <Home />}
        {menudata === 'User' && <User />}
        {menudata === 'Advertisement' && <Advertisements />}
        {menudata === 'ContactUs' && <Contact />}
      </Box>
    </Box>
  );
};

export default Sidebar;
