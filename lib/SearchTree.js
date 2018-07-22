class SearchTree {
  constructor() {
    this.tree = { 0: {} };
  }

  addWord({ word, result }) {
    const wordString = new String(word.toLowerCase().trim());

    return this.processWord({
      word: wordString,
      result: result || wordString
    });
  }

  processWord({
    word,
    result,
    index = 0,
    level = 0,
    node = this.tree[level]
  }) {
    if (index === word.length) {
      if (level === word.length - 1) {
        return;
      }

      level += 1;

      if (!this.tree[level]) {
        this.tree[level] = {};
      }

      return this.processWord({
        word,
        result,
        level,
        index: level,
        node: this.tree[level]
      });
    }

    const letter = word[index];

    if (!node[letter]) {
      node[letter] = {
        results: []
      };
    }

    node[letter]["results"].push(result);

    return this.processWord({
      word,
      result,
      level,
      index: ++index,
      node: node[letter]
    });
  }

  search({ query, index = 0, level = 0, node = this.tree[level] }) {
    return this.processSearch({
      query: query.toLowerCase(),
      index,
      level,
      node
    });
  }

  processSearch({ query, index = 0, level = 0, node = this.tree[level] }) {
    const letter = query[index];

    if (!node) {
      return [];
    }

    if (!letter) {
      return node.results || [];
    }

    if (node[letter]) {
      return this.processSearch({
        query,
        index: ++index,
        level,
        node: node[letter]
      });
    }

    level++;

    return this.processSearch({
      query,
      index: 0,
      level,
      node: this.tree[level]
    });
  }
}

module.exports = SearchTree;
