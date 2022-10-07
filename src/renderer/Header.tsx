import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  return (
    <AppBar>
      <ToolBar>
        <IconButton
          id="main-menu-button"
          aria-controls={open ? 'main-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          size="large"
          edge="start"
          color="inherit"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="main-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'main-menu-button',
          }}
        >
          <MenuItem
            onClick={() => {
              navigate('/');
              handleClose();
            }}
          >
            Home
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/sources');
              handleClose();
            }}
          >
            Manage Sources
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/content');
              handleClose();
            }}
          >
            View Content
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/global');
              handleClose();
            }}
          >
            Global Reports
          </MenuItem>
        </Menu>
        ζητοῦμεν
      </ToolBar>
    </AppBar>
  );
};

export default Header;
