import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Header from './Header';
import doGlobal from './doGlobal';

const GlobalPage = () => {
  const [data, setData] = useState([]);
  const usfmUrl =
    'https://raw.githubusercontent.com/mvh-solutions/translation-tag-tracker/main/data/lsg_aligned/alignedtext_41_mark.usfm';

  useEffect(() => {
    const doFetch = async () => {
      const response = await Axios.get(usfmUrl);
      setData(doGlobal(response.data));
    };
    doFetch();
  }, []);

  return (
    <Box className="page">
      <Header />
      <Box
        className="page_body"
        sx={{
          overflow: 'hidden',
          overflowY: 'scroll',
          height: '95vh',
          width: '95vw',
        }}
      >
        <Typography variant="h4">Global Reports</Typography>
        <ul>
          {data.map((rec) => (
            <li>
              <b>{rec[0]}</b>
              <ul>
                {rec[1].map((v) => (
                  <li>{v}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};
export default GlobalPage;
