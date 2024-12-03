import React, { useState } from 'react';
import {IconButton, ListItem, ListItemText, List , Drawer} from '@mui/material'
import {FaHamburger} from 'react-icons/fa'
import { blue } from '@mui/material/colors';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  return (
    <>
        <IconButton onClick={toggleDrawer(true)} style={{ color:'blue' ,position: 'fixed', top: 10, left: 10 }}>
        <FaHamburger />
        <div className="inline">Dashboard</div>
      </IconButton>
      <Drawer className='bg-indigo-400' anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List style={{
          width: '220px',
          bgcolor: '#2d3748',
          color: 'Black',
          
        }}  >
          <ListItem button>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Tasks" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Teams" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Project" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
