import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from 'react';

import Header from './Header';
import doGlobal from './doGlobal';
import TranslationTree from './TranslationTree';

const GlobalPage = ({ pk }) => {
  const [data, setData] = useState([]);
  const [verseRef, setVerseRef] = useState(null);
  const [verseContent, setVerseContent] = useState('');

  useEffect(() => {
    setData(doGlobal(pk));
  }, []);

  useEffect(() => {
    if (verseRef) {
      const result = pk.gqlQuerySync(`{
        documents {
          cv(chapter:"${verseRef.chapter}" verses: ["${verseRef.verse}"]){ text }
        }
      }`);
      setVerseContent(
        `${verseRef.book} ${verseRef.chapter}:${
          verseRef.verse
        } - ${result.data.documents[0].cv.map((c) => c.text).join(' ')}`
      );
    }
  }, [verseRef]);

  return (
    <Container className="page">
      <Header pageTitle="Lemmas" />
      <Grid className="page_body" container spacing={2}>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 700,
            overflow: 'hidden',
            overflowY: 'scroll',
          }}
        >
          <TranslationTree data={data} setVerseRef={setVerseRef} />
        </Grid>
        <Grid item xs={6} styles={{ padding: '2em' }}>
          <Typography variant="body1">{verseContent}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
export default GlobalPage;
