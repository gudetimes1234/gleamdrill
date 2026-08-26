export function minDistance(word1: string, word2: string): number {
  // Three edits, three neighbours in the table: replace comes from the
  // diagonal, delete from above, insert from the left. Equal characters cost
  // nothing and take the diagonal outright -- the whole algorithm is those four
  // lines. The first row and column are the cost of building a string from
  // nothing, which is its length.
  let previous = Array.from({ length: word2.length + 1 }, (_, j) => j);

  for (let i = 1; i <= word1.length; i++) {
    const row = new Array<number>(word2.length + 1).fill(0);
    row[0] = i;
    for (let j = 1; j <= word2.length; j++) {
      row[j] =
        word1[i - 1] === word2[j - 1]
          ? previous[j - 1]
          : 1 + Math.min(previous[j - 1], previous[j], row[j - 1]);
    }
    previous = row;
  }

  return previous[word2.length];
}
