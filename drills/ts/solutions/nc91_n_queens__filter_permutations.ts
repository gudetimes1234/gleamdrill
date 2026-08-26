export function solveNQueens(n: number): string[][] {
  // One queen per row with no two sharing a column *is* a permutation of the
  // columns, so the row and column rules are satisfied by construction and only
  // the diagonals are left to test. Generating all n! and filtering is far
  // slower than pruning as you go -- it explores arrangements a backtracker
  // would have abandoned at the second queen -- but it names what the search
  // space actually is.
  return permutations(Array.from({ length: n }, (_, i) => i))
    .filter(noDiagonalClash)
    .map((chosen) => chosen.map((c) => ".".repeat(c) + "Q" + ".".repeat(n - c - 1)));
}

function permutations(values: number[]): number[][] {
  if (values.length === 0) return [[]];
  return values.flatMap((value, i) =>
    permutations([...values.slice(0, i), ...values.slice(i + 1)]).map((tail) => [
      value,
      ...tail,
    ]),
  );
}

function noDiagonalClash(chosen: number[]): boolean {
  for (let a = 0; a < chosen.length; a++) {
    for (let b = a + 1; b < chosen.length; b++) {
      if (Math.abs(a - b) === Math.abs(chosen[a] - chosen[b])) return false;
    }
  }
  return true;
}
