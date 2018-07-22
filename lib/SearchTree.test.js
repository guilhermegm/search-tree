const test = require("tape");
const SearchTree = require("./SearchTree");

test("addWord", t => {
  const Tree = new SearchTree();
  const expectedTree = {
    "0": {
      a: {
        results: [new String("abc")],
        b: { results: [new String("abc")], c: { results: [new String("abc")] } }
      }
    },
    "1": {
      b: { results: [new String("abc")], c: { results: [new String("abc")] } }
    },
    "2": { c: { results: [new String("abc")] } }
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

test("search - not found", t => {
  const Tree = new SearchTree();
  const expectedResult = [];

  Tree.addWord({ word: "Bottle" });
  Tree.addWord({ word: "Bottom" });
  Tree.addWord({ word: "Up" });

  t.deepEqual(Tree.search({ query: "Right" }), []);
  t.end();
});

test("search - with diferent result", t => {
  const Tree = new SearchTree();
  const expectedResult = [{ message: "getting other result" }, new String("ybl")];

  Tree.addWord({ word: "abc", result: { message: "getting other result" } });
  Tree.addWord({ word: "ybl" });

  t.deepEqual(Tree.search({ query: "B" }), expectedResult);
  t.end();
});
