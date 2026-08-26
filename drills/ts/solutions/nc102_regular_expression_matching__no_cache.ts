export function isMatch(s: string, p: string): boolean {
  // The same rules with no table at all. Shorter and easier to trust, and
  // exponential on patterns like "a*a*a*a*b" where the same suffix is reached
  // along many different splits. Worth writing first, then adding the cache
  // once it is right.
  if (p === "") return s === "";

  const here = s !== "" && (p[0] === s[0] || p[0] === ".");

  if (p.length >= 2 && p[1] === "*") {
    return isMatch(s, p.slice(2)) || (here && isMatch(s.slice(1), p));
  }

  return here && isMatch(s.slice(1), p.slice(1));
}
