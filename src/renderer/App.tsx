import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';

import Header from './Header';

import GlobalPage from './GlobalPage';
import './App.css';

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
