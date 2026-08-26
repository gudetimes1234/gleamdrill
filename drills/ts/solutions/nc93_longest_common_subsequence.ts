export function longestCommonSubsequence(text1: string, text2: string): number {
  // Compare the last characters: equal means both are used and the answer is
  // one more than the rest, different means the best of dropping one or the
  // other. Filled row by row, only the previous row is ever needed.
  let previous = new Array<number>(text2.length + 1).fill(0);

  for (const a of text1) {
    const row = new Array<number>(text2.length + 1).fill(0);
    for (let j = 1; j <= text2.length; j++) {
      row[j] = a === text2[j - 1] ? previous[j - 1] + 1 : Math.max(previous[j], row[j - 1]);
    }
    previous = row;
  }

  return previous[text2.length];
}
