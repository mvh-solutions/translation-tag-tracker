import React, { useState, useEffect } from 'react';

import { PerfRenderFromProskomma } from 'proskomma-json-tools';

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
  const [selectedLetter, setSelectedLetter] = useState('α');

  const initialLetters = [
    'א',
    'ב',
    'ג',
    'ד',
    'ה',
    'ו',
    'ז',
    'ח',
    'ט',
    'י',
    'כ',
    'ל',
    'מ',
    'נ',
    'ס',
    'ע',
    'פ',
    'צ',
    'ק',
    'ר',
    'ש',
    'ת',
    'α',
    'β',
    'γ',
    'δ',
    'ε',
    'ζ',
    'η',
    'θ',
    'ι',
    'κ',
    'λ',
    'μ',
    'ν',
    'ξ',
    'ο',
    'π',
    'ρ',
    'σ',
    'τ',
    'υ',
    'φ',
    'χ',
    'ψ',
    'ω',
  ];

  const mergeLemmas = () => {
    const ret = {};
    for (const bookLemmas of Object.values(lemmas)) {
      for (const [lemma, lemmaValues] of Object.entries(bookLemmas)) {
        if (!ret[lemma]) {
          ret[lemma] = {};
        }
        for (const [lemmaTranslation, lemmaReferences] of Object.entries(
          lemmaValues
        )) {
          if (ret[lemma][lemmaTranslation]) {
            for (const reference of lemmaReferences) {
              ret[lemma][lemmaTranslation].add(reference);
            }
          } else {
            ret[lemma][lemmaTranslation] = new Set(lemmaReferences);
          }
        }
      }
    }
    for (const [lemma, lemmaValues] of Object.entries(ret)) {
      for (const lemmaTranslation of Object.keys(lemmaValues)) {
        ret[lemma][lemmaTranslation] = Array.from(ret[lemma][lemmaTranslation]);
      }
    }
    return ret;
  };

  useEffect(() => {
    const newLemmas = { ...lemmas };
    let changed = false;
    for (const selectedBookCode of processAll
      ? docSets[translation].documents
      : [bookCode]) {
      console.log(selectedBookCode);
      if (!lemmas[selectedBookCode] && docSets[translation]) {
        changed = true;
        const docId = proskomma.gqlQuerySync(
          `{document(docSetId:"${translation}" withBook:"${selectedBookCode}") {id}}`
        ).data.document.id;
        const pkRender = new PerfRenderFromProskomma({
          proskomma,
          actions: lemmaActions,
        });
        const output = {};
        pkRender.renderDocument({ docId, config: {}, output });
        newLemmas[selectedBookCode] = output.lemmas;
      }
    }
    if (changed) {
      setLemmas(newLemmas);
    }
  }, [processAll, bookCode, translation]);

  useEffect(() => {
    if (verseRefs.length === 0) {
      return;
    }
    const newVerseContent = [];
    const [translationTerm, translationRefs] = verseRefs;
    for (const verseRef of translationRefs) {
      const [book, cv] = verseRef.split(' ');
      const [c, v] = cv.split(':');
      const refText = proskomma
        .gqlQuerySync(
          `{ document(docSetId: """${translation}""" withBook: """${book}""") { cv(chapter:"""${c}""" verses:["""${v}"""]) { tokens { payload } } } }`
        )
        .data.document.cv[0].tokens.map((t) => t.payload.toLowerCase() === translationTerm ? <u><i>{t.payload}</i></u> : t.payload);
      newVerseContent.push([<b>{verseRef}</b>, ' - ', ...refText]);
    }
    setVerseContent(newVerseContent);
  }, [verseRefs]);

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
                    {db}{lemmas[db] ? "*" : ""}
                  </Typography>
                </Button>
              </Grid>
            ))}
          <Grid item xs={1}>
            <Button
              size="small"
              color="secondary"
              variant="text"
              onClick={() => setProcessAll(!processAll)}
            >
              <Typography variant="body1">{processAll ? <b>All</b> : "All"}</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container className="greek_lemma">
          {initialLetters.map((l, n) => (
            <Grid key={n} item xs={1}>
              <Button
                size="small"
                color="secondary"
                variant={l === selectedLetter ? 'contained' : 'text'}
                onClick={() => setSelectedLetter(l)}
              >
                <Typography variant="body1">{l}</Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
        <Grid container className="results" style={{ display: 'flex' }}>
          <Grid item xs={6} style={{ maxHeight: '650px', overflow: 'auto' }}>
            {(lemmas[bookCode] || processAll) && (
              <TranslationTree
                lemma={processAll ? mergeLemmas() : lemmas[bookCode]}
                setVerseRefs={setVerseRefs}
                selectedLetter={selectedLetter}
              />
            )}
          </Grid>
          <Grid item xs={6} style={{ maxHeight: '650px', overflow: 'auto' }}>
            {verseContent.map((c, n) => (
              <Box key={n}>{c}</Box>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default LemmaTranslationsPage;
