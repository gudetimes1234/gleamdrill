export function generateParenthesis(n: number): string[] {
  return compose(n);
}

// Every non-empty balanced string is "(" + A + ")" + B for exactly one split: A
// is whatever the first bracket encloses, B is whatever follows it. Enumerating
// the splits enumerates the strings, with no validity rule to check at all.
function compose(n: number): string[] {
  if (n <= 0) return [""];
  const out: string[] = [];
  for (let inner = 0; inner < n; inner++) {
    for (const a of compose(inner)) {
      for (const b of compose(n - 1 - inner)) out.push(`(${a})${b}`);
    }
  }
  return out;
}
