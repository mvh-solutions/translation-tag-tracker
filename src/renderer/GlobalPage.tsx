import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';

import Header from './Header';
import doGlobal from './doGlobal';
import TranslationTree from './TranslationTree';

const GlobalPage = ({ pk }) => {
  const [data, setData] = useState([]);
  const [verseRefs, setVerseRefs] = useState([]);
  const [versesContent, setVersesContent] = useState([]);
  const [bookCode, setBookCode] = useState('TIT');
  const [gL, setGL] = useState('');

  useEffect(() => {
    setData(doGlobal(pk));
  }, []);

  useEffect(() => {
    if (verseRefs.length > 0) {
      console.log("verseRefs", verseRefs);
      const cvClauses = verseRefs.map(
        (vr, n) =>
          `cv${n}: cv(chapter:"${vr.chapter}" verses: ["${vr.verse}"]){ tokens { subType payload } scopeLabels }`
      );
      const result = pk.gqlQuerySync(`{
        document(docSetId:"eng_ult" withBook:"${bookCode}") {
          bookCode: header(id: "bookCode")
          ${cvClauses.join('\n')}
        }
      }`);
      const cvs = Object.entries(result.data.document)
        .filter(kv => kv[0] !== 'bookCode')
        .map((kv) => kv[1]);
      setVersesContent(cvs);
    }
  }, [verseRefs]);

  console.log(versesContent);

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
          <TranslationTree data={data} setVerseRefs={setVerseRefs} setGL={setGL} />
        </Grid>
        <Grid
          item
          xs={6}
          styles={{ padding: '2em' }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 700,
            overflow: 'hidden',
            overflowY: 'scroll',
          }}
        >
          <Box>
            {versesContent.map((vc, n) => (
              <div key={n}>
                <Typography key={`${n}Ref`} variant="body1">
                  {vc[0]}{' '}
                  {
                    vc[1].scopeLabels
                      .filter((sl) => sl.startsWith('chapter'))[0]
                      .split('/')[1]
                  }
                  :
                  {
                    vc[1].scopeLabels
                      .filter((sl) => sl.startsWith('verse'))[0]
                      .split('/')[1]
                  }
                </Typography>
                <Typography key={`${n}Body`} variant="body2">
                  {' '}
                  {vc[1].tokens.map(t => t.payload === gL ? <b>{t.payload}</b> : t.payload)}
                </Typography>
              </div>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
export default GlobalPage;
