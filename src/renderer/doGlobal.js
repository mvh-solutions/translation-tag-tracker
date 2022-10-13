import { Proskomma } from 'proskomma';

const doGlobal = (usfmString) => {
  const pk = new Proskomma();

  // Load USFM
  pk.importDocument(
    {
      lang: 'abc',
      abbr: 'uvw',
    },
    'usfm',
    usfmString
  );

  // Run query
  const result = pk.gqlQuerySync(
    `{
                scripture: docSet(id:"abc_uvw") {
                    documents {
                        bookCode: header(id:"bookCode")
                        cvIndexes {
                            chapter
                            verses {
                                verse {
                                    verseRange
                                    items {
                                        type
                                        subType
                                        payload
                                }
                            }
                        }
                    }
                }
            }
        }`
  );

  // Get alignment info from USFM
  const lemmaTranslations = {};
  for (const cvIndex of result.data.scripture.documents[0].cvIndexes) {
    for (const [vn, verseItems] of cvIndex.verses.map((v, vn2) =>
      [vn2, v.verse.map((v) => v.items).reduce((a, b) => [...a, ...b], [])]
    )) {
      const wrappers = [];
      let currentWrapped = null;
      for (const item of verseItems) {
        if (item.type === 'scope') {
          if (
            item.payload.startsWith('milestone/zaln') &&
            item.subType === 'start'
          ) {
            if (currentWrapped) {
              currentWrapped.wrappers.push({});
            } else {
              currentWrapped = { wrappers: [{}], wrapped: [] };
            }
            wrappers.push({});
          }
          if (
            item.payload.startsWith('milestone/zaln') &&
            item.subType === 'end'
          ) {
            wrappers.pop();
            if (wrappers.length === 0) {
              for (const wrapper of currentWrapped.wrappers) {
                if (
                  !lemmaTranslations[wrapper['x-lemma'].toLocaleLowerCase()]
                ) {
                  lemmaTranslations[wrapper['x-lemma'].toLocaleLowerCase()] =
                    {};
                }
                const content = currentWrapped.wrapped
                  .join(' ')
                  .toLocaleLowerCase();
                if (
                  !lemmaTranslations[wrapper['x-lemma'].toLocaleLowerCase()][
                    content
                  ]
                ) {
                  lemmaTranslations[wrapper['x-lemma'].toLocaleLowerCase()][
                    content
                  ] = {count: 0, cvs: []};
                }
                lemmaTranslations[wrapper['x-lemma'].toLocaleLowerCase()][
                  content
                ].count++;
                lemmaTranslations[wrapper['x-lemma'].toLocaleLowerCase()][
                  content
                  ].cvs.push({book: result.data.scripture.documents[0].bookCode, chapter: cvIndex.chapter, verse: vn});
              }
              currentWrapped = null;
            }
          }
          if (
            item.payload.startsWith('attribute/milestone/zaln') &&
            item.subType === 'start' &&
            ['x-lemma'].includes(item.payload.split('/')[3])
          ) {
            currentWrapped.wrappers[currentWrapped.wrappers.length - 1][
              item.payload.split('/')[3]
            ] = item.payload.split('/')[5];
          }
        }
        if (item.subType === 'wordLike' && currentWrapped) {
          currentWrapped.wrapped.push(item.payload);
        }
      }
    }
  }

  // Rework lemma info
  const lemmaReport = Object.entries(lemmaTranslations)
    .sort((a, b) =>
      a[0].toLocaleLowerCase().localeCompare(b[0].toLocaleLowerCase())
    )
    .map((lem) => [
      { lemma: lem[0] },
      Object.entries(lem[1])
        .sort((a, b) => b[1] - a[1])
        .map((e) => ({
          gl: e[0],
          count: e[1].count,
          cvs: e[1].cvs,
        })),
    ]);
  return lemmaReport;
};

export default doGlobal;
