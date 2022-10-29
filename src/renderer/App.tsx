import { Proskomma } from 'proskomma';
import React, { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';

import Header from './Header';

import SourcesPage from './SourcesPage';
import LemmaTranslationsPage from './LemmaTranslationsPage';
import './App.css';

const HomePage = ({nDocSets}) => {
  return (
    <Box className="page">
      <Header pageTitle="Home" nDocSets={nDocSets}/>
      <Box className="page_body">HOME</Box>
    </Box>
  );
};

const pk = new Proskomma();

export default function App() {
  const [translation, setTranslation] = useState('fra_lsg');
  const [docSets, setDocSets] = useState({});
  const nDocSets = Object.keys(docSets).length;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage nDocSets={nDocSets} />} />
        <Route
          path="/sources"
          element={
            <SourcesPage
              proskomma={pk}
              nDocSets={nDocSets}
              translation={translation}
              docSets={docSets}
              setDocSets={setDocSets}
              setTranslation={setTranslation}
            />
          }
        />
        <Route
          path="/lemma-translations"
          element={
            <LemmaTranslationsPage
              proskomma={pk}
              nDocSets={nDocSets}
              translation={translation}
              docSets={docSets}
            />
          }
        />
      </Routes>
    </Router>
  );
}
