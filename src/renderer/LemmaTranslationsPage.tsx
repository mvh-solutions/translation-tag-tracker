import React, { useState, useEffect } from 'react';

import { PerfRenderFromProskomma} from 'proskomma-json-tools';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import lemmaActions from './lemmaActions';
import TranslationTree from './TranslationTree';
import Header from './Header';

const LemmaTranslationsPage = ({ proskomma, translation, docSets }) => {
  const [bookCode, setBookCode] = useState('MAT');
  const [processAll, setProcessAll] = useState(false);
  const [lemmas, setLemmas] = useState({});
  const [verseRefs, setVerseRefs] = useState([]);
  const [verseContent, setVerseContent] = useState([]);

  useEffect(() => {
    if (!lemmas[bookCode] && docSets[translation]) {
      const docId = proskomma.gqlQuerySync(
        `{document(docSetId:"${translation}" withBook:"${bookCode}") {id}}`
      ).data.document.id;
      const pkRender = new PerfRenderFromProskomma({proskomma, actions: lemmaActions});
      const output = {};
      pkRender.renderDocument({docId, config: {}, output});
      const newLemmas = { ...lemmas };
      newLemmas[bookCode] = output.lemmas;
      setLemmas(newLemmas);
    }
  }, [processAll, bookCode, translation]);

  useEffect(
    () => {
      setVerseContent(verseRefs);
    }, [verseRefs]
  );

  return (
    <Container className="page">
      <Header
        pageTitle={`Lemma Translations for ${translation
          .split('_')[1]
          .toUpperCase()}`}
      />
      <Grid className="page_body" container spacing={2}>
        <Grid container className="books">
          {docSets[translation] &&
            docSets[translation].documents.map((db, n) => (
              <Grid key={n} item xs={1}>
                <Button
                  size="small"
                  variant="text"
                  color="secondary"
                  disabled={processAll}
                  onClick={() => setBookCode(db)}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: db === bookCode ? 'bold' : 'normal' }}
                  >
                    {db}
                  </Typography>
                </Button>
              </Grid>
            ))}
          <Grid item xs={12}>
            <Button
              size="small"
              color="secondary"
              variant={processAll ? 'contained' : 'outlined'}
              onClick={() => setProcessAll(!processAll)}
            >
              <Typography variant="body1">All BOOKS</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container className="results" style={{display: "flex"}}>
          <Grid item xs={6} style={{maxHeight: '500px', overflow: 'auto'}}>
            {lemmas[bookCode] && <TranslationTree lemma={lemmas[bookCode]} setVerseRefs={setVerseRefs} />}
          </Grid>
          <Grid item xs={6} style={{maxHeight: '500px', overflow: 'auto'}}>
            {verseContent.map((c, n) => <Box key={n}>{c}</Box>)}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default LemmaTranslationsPage;
