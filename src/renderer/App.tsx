import React from 'react';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ToolBar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import './App.css';

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

const HomePage = () => {
  return (
    <Box className="page">
      <Header />
      <Box className="page_body">HOME</Box>
    </Box>
  );
};

const SourcesPage = () => {
  return (
    <Box className="page">
      <Header />
      <Box className="page_body">Sources</Box>
    </Box>
  );
};

const ContentPage = () => {
  return (
    <Box className="page">
      <Header />
      <Box className="page_body">Content</Box>
    </Box>
  );
};

const GlobalPage = () => {
  return (
    <Box className="page">
      <Header />
      <Box className="page_body">Global</Box>
    </Box>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sources" element={<SourcesPage />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="/global" element={<GlobalPage />} />
      </Routes>
    </Router>
  );
}
