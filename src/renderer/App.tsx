import { Proskomma } from 'proskomma';
import React, {useEffect} from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';

import Header from './Header';

import GlobalPage from './GlobalPage';
import './App.css';
import Axios from "axios";
import doGlobal from "./doGlobal";

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

const pk = new Proskomma();

export default function App() {

  const usfmUrl =
    `https://git.door43.org/unfoldingWord/en_ult/raw/branch/master/46-ROM.usfm`;
    // 'https://raw.githubusercontent.com/mvh-solutions/translation-tag-tracker/main/data/lsg_aligned/alignedtext_41_mark.usfm';

  useEffect(() => {
    const doFetch = async () => {
      const response = await Axios.get(usfmUrl);
      pk.importDocument(
        {
          lang: 'abc',
          abbr: 'uvw',
        },
        'usfm',
        response.data,
      );
    };
    doFetch();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sources" element={<SourcesPage />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="/global" element={<GlobalPage pk={pk}/>} />
      </Routes>
    </Router>
  );
}
