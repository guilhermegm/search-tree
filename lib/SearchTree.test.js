const test = require("tape");
const SearchTree = require("./SearchTree");

test("addWord", t => {
  const Tree = new SearchTree();
  const expectedTree = {
    "0": {
      a: {
        words: [new String("abc")],
        b: { words: [new String("abc")], c: { words: [new String("abc")] } }
      }
    },
    "1": {
      b: { words: [new String("abc")], c: { words: [new String("abc")] } }
    },
    "2": { c: { words: [new String("abc")] } }
  };

  Tree.addWord({ word: "abc" });

  t.deepEqual(Tree.tree, expectedTree);
  t.end();
});

test("search", t => {
  const Tree = new SearchTree();
  const expectedResult = [new String("abc"), new String("ybl")];

  Tree.addWord({ word: "abc" });
  Tree.addWord({ word: "ybl" });

  t.deepEqual(Tree.search({ query: "b" }), expectedResult);
  t.end();
});

test("search upper case", t => {
  const Tree = new SearchTree();
  const expectedResult = [new String("abc"), new String("ybl")];

  Tree.addWord({ word: "abc" });
  Tree.addWord({ word: "ybl" });

  t.deepEqual(Tree.search({ query: "B" }), expectedResult);
  t.end();
});
