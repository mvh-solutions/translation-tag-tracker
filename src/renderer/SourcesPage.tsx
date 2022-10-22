import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import React from 'react';

import Header from './Header';

const SourcesPage = ({
  translation,
  docSets,
  setTranslation,
  availableTranslations,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTranslation((event.target as HTMLInputElement).value);
  };
  return (
    <Container className="page">
      <Header pageTitle="Sources" />
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
              {availableTranslations.map((t, n) => (
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
