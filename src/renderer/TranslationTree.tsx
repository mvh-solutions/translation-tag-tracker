import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import React from 'react';

const TranslationTree = ({lemma}) => {
  return (
    <TreeView
      aria-label="lemma navigator"
      defaultCollapseIcon={<ExpandMoreIcon/>}
      defaultExpandIcon={<ChevronRightIcon/>}
    >
      {
        Object.entries(lemma)
          .map((kv, n) => (
              <TreeItem
                key={n}
                nodeId={`${n}`}
                label={`${kv[0]} (${Object.keys(kv[1]).length} translation${Object.keys(kv[1]).length === 1 ? "" : "s"}, ${Object.values(kv).reduce((a, b) => Object.keys(a).length + Object.keys(b).length)} total)`}>
                {
                  Object.entries(kv[1])
                    .map((kv2, n2) =>
                      <TreeItem
                      key={n2}
                      nodeId={`${n}_${n2}`}
                      label={`${kv2[0]} (${kv2[1].length})`}
                      >

                      </TreeItem>)
                }
              </TreeItem>
            )
          )
      }
    </TreeView>
  );
};

export default TranslationTree;
