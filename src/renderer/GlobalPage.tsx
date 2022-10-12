import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
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
      <Box className="page_body" sx={{}}>
        <Typography variant="h4">Global Reports</Typography>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {data.map((rec, n) => (
            <TreeItem
              key={n}
              nodeId={rec[0].lemma}
              label={`${rec[0].lemma} (${rec[1]
                .map((v) => v.count)
                .reduce((a, b) => a + b)} total of ${rec[1].length} GL word${
                rec[1].length === 1 ? '' : 's'
              })`}
            >
              {rec[1].map((v, n2) => (
                <TreeItem
                  key={n2}
                  nodeId={v.gl}
                  label={`${v.gl} (${v.count})`}
                />
              ))}
            </TreeItem>
          ))}
        </TreeView>
      </Box>
    </Box>
  );
};
export default GlobalPage;
