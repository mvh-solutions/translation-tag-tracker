import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import React from 'react';

const TranslationTree = ({ lemma, setVerseRefs }) => {
  return (
    <TreeView
      aria-label="lemma navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {Object.entries(lemma).map((kv, n) => (
        <TreeItem
          key={n}
          nodeId={`${n}`}
          label={`${kv[0]} (${
            Object.keys(kv[1]).length > 1
              ? `${Object.keys(kv[1]).length} translations, `
              : ''
          }${Object.values(kv[1]).reduce(
            (a, b) => [...a, ...b],
            []
          ).length} total)`}
        >
          {Object.entries(kv[1]).map((kv2, n2) => (
            <TreeItem
              key={n2}
              nodeId={`${n}_${n2}`}
              label={`${kv2[0]} (${kv2[1].length})`}
              onClick={() => setVerseRefs(kv2[1])}
            />
          ))}
        </TreeItem>
      ))}
    </TreeView>
  );
};

export default TranslationTree;
