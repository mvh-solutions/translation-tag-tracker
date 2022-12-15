import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import removeAccents from 'remove-accents';
import TreeItem from '@mui/lab/TreeItem';
import React from 'react';

const TranslationTree = ({lemma, setVerseRefs, selectedLetter}) => {

  const accentedLetters = {
    "ἀ": "α",
    "ἁ": "α",
    "ἂ": "α",
    "ἄ": "α",
    "ἅ": "α",
    "ἆ": "α",
    "ἐ": "ε",
    "ἑ": "ε",
    "ἔ": "ε",
    "ἕ": "ε",
    "ἠ": "η",
    "ἡ": "η",
    "ἤ": "η",
    "ἥ": "η",
    "ἦ": "η",
    "ἧ": "η",
    "ἰ": "ι",
    "ἱ": "ι",
    "ἴ": "ι",
    "ἵ": "ι",
    "ἶ": "ι",
    "ὀ": "ο",
    "ὁ": "ο",
    "ὄ": "ο",
    "ὅ": "ο",
    "ὑ": "υ",
    "ὕ": "υ",
    "ὗ": "υ",
    "ὠ": "ω",
    "ὡ": "ω",
    "ὥ": "ω",
    "ὦ": "ω",
    "ὧ": "ω",
    "ᾄ": "α",
    "ᾅ": "α",
    "ᾠ": "ω",
    "ῥ": "ρ"
  };
  const unaccented = a => accentedLetters[a] || a;

  return (
    <TreeView
      aria-label="lemma navigator"
      defaultCollapseIcon={<ExpandMoreIcon/>}
      defaultExpandIcon={<ChevronRightIcon/>}
    >
      {Object.entries(lemma)
        .filter((l) => {
          return selectedLetter === '' ||
            unaccented(
              removeAccents(l[0]).toLowerCase()[0]
            ) === selectedLetter;
        })
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map((kv, n) => (
          <TreeItem
            key={n}
            nodeId={`${n}`}
            label={`${kv[0]} (${
              Object.keys(kv[1]).length > 1
                ? `${Object.keys(kv[1]).length} translations, `
                : ''
            }${
              Object.values(kv[1]).reduce((a, b) => [...a, ...b], []).length
            } total)`}
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
