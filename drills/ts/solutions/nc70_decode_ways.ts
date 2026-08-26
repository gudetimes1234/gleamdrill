export function numDecodings(s: string): number {
  if (s.length === 0) return 0;

  // Two rolling counts. The ways to decode up to here are the ways up to the
  // previous character (if this one can stand alone) plus the ways up to the
  // one before that (if this one and its predecessor form a legal pair). A
  // leading zero kills the first branch; anything outside 10..26 the second.
  let twoBack = 1;
  let oneBack = 1;

  for (let i = 0; i < s.length; i++) {
    const alone = s[i] === "0" ? 0 : oneBack;
    const pair = i > 0 ? Number(s.slice(i - 1, i + 1)) : 0;
    const paired = i > 0 && pair >= 10 && pair <= 26 ? twoBack : 0;
    [twoBack, oneBack] = [oneBack, alone + paired];
  }

  return oneBack;
}
