import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

import Header from './Header';

const GlobalPage = () => {
  const usfm = fse.readFileSync(path.resolve('../data/lsg_aligned/foo.usfm'));

  return (
    <Box className="page">
      <Header />
      <Box className="page_body">
        <Typography variant="h4">Global Reports</Typography>
        <Typography variant="body1">Foo</Typography>
      </Box>
    </Box>
  );
};
export default GlobalPage;
