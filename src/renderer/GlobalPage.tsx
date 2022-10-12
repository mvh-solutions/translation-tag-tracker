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
          {data.map((rec) => (
            <TreeItem nodeId={rec[0]} label={rec[0]}>
              {rec[1].map((v) => (
                <TreeItem nodeId={v} label={v} />
              ))}
            </TreeItem>
          ))}
        </TreeView>
      </Box>
    </Box>
  );
};
export default GlobalPage;
