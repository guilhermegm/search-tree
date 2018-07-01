class SearchTree {
  constructor() {
    this.tree = { 0: {} };
  }

  addWord({ word }) {
    return this.processWord({
      word: new String(word.toLowerCase().trim())
    });
  }

  processWord({ word, index = 0, level = 0, node = this.tree[level] }) {
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
        level,
        index: level,
        node: this.tree[level]
      });
    }

    const letter = word[index];

    if (!node[letter]) {
      node[letter] = {
        words: []
      };
    }

    node[letter]["words"].push(word);

    return this.processWord({
      word,
      level,
      index: ++index,
      node: node[letter]
    });
  }

  search({ query, index = 0, level = 0, node = this.tree[level] }) {
    const letter = query[index];

    if (!letter) {
      return node.words;
    }

    if (node[letter]) {
      return this.search({
        query,
        index: ++index,
        level,
        node: node[letter]
      });
    }

    level++;

    return this.search({
      query,
      index: 0,
      level,
      node: this.tree[level]
    });
  }
}

module.exports = SearchTree;
