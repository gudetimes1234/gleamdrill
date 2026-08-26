export function checkValidString(s: string): boolean {
  // Two one-sided checks. Left to right with every star an opener asks whether
  // there are ever too many closers; right to left with every star a closer
  // asks whether there are ever too many openers. Passing both is exactly the
  // condition, and each pass is the ordinary balance check.
  return neverNegative(s, "(") && neverNegative([...s].reverse().join(""), ")");
}

function neverNegative(s: string, credit: string): boolean {
  let balance = 0;
  for (const c of s) {
    balance += c === credit || c === "*" ? 1 : -1;
    if (balance < 0) return false;
  }
  return true;
}
