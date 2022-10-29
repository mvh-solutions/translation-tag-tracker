import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import React, { useEffect } from 'react';

import Axios from 'axios';
import Header from './Header';

const SourcesPage = ({
  proskomma,
  nDocSets,
  translation,
  docSets,
  setDocSets,
  setTranslation,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTranslation((event.target as HTMLInputElement).value);
  };

  const downloadUrls = {
    eng_ult: 'https://mvh.bible/serializedSuccinct/eng_ult_pkserialized.json',
    eng_ust: 'https://mvh.bible/serializedSuccinct/eng_ust_pkserialized.json',
    fra_lsg: 'https://mvh.bible/serializedSuccinct/fra_lsg_pkserialized.json',
  };

  useEffect(() => {
    const doFetch = async () => {
      const response = await Axios.get(downloadUrls[translation]);
      proskomma.loadSuccinctDocSet(response.data);
      const docSetsResponse = proskomma.gqlQuerySync(
        '{docSets { id documents { bookCode: header(id:"bookCode") } } }'
      );
      const newDocSets = {};
      for (const docSet of docSetsResponse.data.docSets) {
        newDocSets[docSet.id] = {
          documents: docSet.documents.map((d) => d.bookCode),
        };
      }
      setDocSets(newDocSets);
    };
    if (translation && downloadUrls[translation]) {
      const loadedTranslations = proskomma
        .gqlQuerySync('{docSets { id }}')
        .data.docSets.map((ds) => ds.id);
      if (!loadedTranslations.includes(translation)) {
        doFetch();
      }
    }
  }, [translation]);

  return (
    <Container className="page">
      <Header pageTitle="Sources" nDocSets={nDocSets}/>
      <Grid className="page_body" container spacing={2}>
        <Grid item>
          <FormControl>
            <FormLabel id="sources-buttons-group">
              <Typography variant="h5">Selected Translation</Typography>
            </FormLabel>
            <RadioGroup
              aria-labelledby="sources-buttons-group"
              name="sources-buttons"
              value={translation}
              onChange={handleChange}
            >
              {Object.keys(downloadUrls).map((t, n) => (
                <FormControlLabel
                  key={n}
                  value={t}
                  control={<Radio />}
                  label={`${t}${docSets[t] ? ' (loaded)' : ''}`}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
};
export default SourcesPage;
