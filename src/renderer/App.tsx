import { Proskomma } from 'proskomma';
import React, { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';

import Header from './Header';

import SourcesPage from './SourcesPage';
import LemmaTranslationsPage from './LemmaTranslationsPage';
import './App.css';
import Axios from 'axios';

const HomePage = () => {
  return (
    <Box className="page">
      <Header pageTitle="Home" />
      <Box className="page_body">HOME</Box>
    </Box>
  );
};

const pk = new Proskomma();

export default function App() {
  const [translation, setTranslation] = useState('fra_lsg');
  const [docSets, setDocSets] = useState({});
  const downloadUrls = {
    eng_ult: 'https://mvh.bible/serializedSuccinct/eng_ult_pkserialized.json',
    eng_ust: 'https://mvh.bible/serializedSuccinct/eng_ust_pkserialized.json',
    fra_lsg: 'https://mvh.bible/serializedSuccinct/fra_lsg_pkserialized.json',
  };
  useEffect(() => {
    const doFetch = async () => {
      const response = await Axios.get(downloadUrls[translation]);
      pk.loadSuccinctDocSet(response.data);
      const docSetsResponse =
        pk.gqlQuerySync('{docSets { id documents { bookCode: header(id:"bookCode") } } }');
      const newDocSets = {};
      for (const docSet of docSetsResponse.data.docSets) {
        newDocSets[docSet.id] = {
          documents: docSet.documents.map(d => d.bookCode),
        }
      }
      setDocSets(newDocSets);
    };
    if (translation && downloadUrls[translation]) {
      const loadedTranslations =
        pk.gqlQuerySync('{docSets { id }}').data.docSets.map (ds => ds.id);
      if (!loadedTranslations.includes(translation)) {
        doFetch();
      }
    }
  }, [translation]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/sources"
          element={
            <SourcesPage
              translation={translation}
              docSets={docSets}
              setTranslation={setTranslation}
              availableTranslations={Object.keys(downloadUrls)}
            />
          }
        />
        <Route
          path="/lemma-translations"
          element={
            <LemmaTranslationsPage
              proskomma={pk}
              translation={translation}
              docSets={docSets}
            />
          }
        />
      </Routes>
    </Router>
  );
}
