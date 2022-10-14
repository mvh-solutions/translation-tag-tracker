import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import React from 'react';

const TranslationTree = ({ data, setVerseRef }) => {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {data.map((rec, n) => (
        <TreeItem
          key={n}
          nodeId={`${n}`}
          label={`${rec[0].lemma} (${rec[1]
            .map((v) => v.count)
            .reduce((a, b) => a + b)} total of ${rec[1].length} GL word${
            rec[1].length === 1 ? '' : 's'
          })`}
        >
          {rec[1].map((v, n2) => (
            <TreeItem
              key={n2}
              nodeId={`${n}_${n2}`}
              label={`${v.gl} (${v.count})`}
            >
              {v.cvs.map((cv, n3) => (
                <TreeItem
                  key={n3}
                  nodeId={`${n}_${n2}_${n3}`}
                  label={`${cv.book} ${cv.chapter}:${cv.verse}`}
                  onClick={() => setVerseRef(cv)}
                />
              ))}
            </TreeItem>
          ))}
        </TreeItem>
      ))}
    </TreeView>
  );
};

export default TranslationTree;
