const lemmaActions = {
  startDocument: [
    {
      description: 'Set up storage',
      test: () => true,
      action: ({ context, workspace, output }) => {
        workspace.bookCode = context.document.metadata.document.bookCode;
        workspace.chapter = null;
        workspace.verses = null;
        workspace.activeLemmas = [];
        output.lemmas = {};
      },
    },
  ],
  mark: [
    {
      description: 'Update CV state',
      test: () => true,
      action: ({ context, workspace }) => {
        const { element } = context.sequences[0];
        if (element.subType === 'chapter') {
          workspace.chapter = element.atts.number;
          workspace.verses = 0;
        } else if (element.subType === 'verses') {
          workspace.verses = element.atts.number;
        }
      },
    },
  ],
  startMilestone: [
    {
      description: 'Add lemma',
      test: ({ context }) => context.sequences[0].element.subType === 'usfm:zaln',
      action: ({ context, workspace }) => {
        workspace.activeLemmas.push(
          context.sequences[0].element.atts['x-lemma'][0].toLowerCase()
        );
      },
    },
  ],
  endMilestone: [
    {
      description: 'Remove lemma',
      test: ({ context }) => context.sequences[0].element.subType === 'usfm:zaln',
      action: ({ context, workspace }) => {
        workspace.activeLemmas.pop();
      },
    },
  ],
  text: [
    {
      description: 'Make lemma record',
      test: ({ workspace }) => workspace.activeLemmas.length > 0,
      action: ({ context, workspace, output }) => {
        for (const lemma of workspace.activeLemmas) {
          if (!output.lemmas[lemma]) {
            output.lemmas[lemma] = {};
          }
          const text = context.sequences[0].element.text.toLowerCase();
          if (!output.lemmas[lemma][text]) {
            output.lemmas[lemma][text] = [];
          }
          output.lemmas[lemma][text].push(`${workspace.bookCode} ${workspace.chapter}:${workspace.verses}`);
        }
      },
    },
  ],
  endDocument: [],
};

export default lemmaActions;
