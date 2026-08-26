
const SEPARATOR = "|";
const ESCAPE = "\\";

export function encode(strs: string[]): string {
  return strs
    .map(
      (s) =>
        SEPARATOR +
        s.split(ESCAPE).join(ESCAPE + ESCAPE).split(SEPARATOR).join(ESCAPE + SEPARATOR),
    )
    .join("");
}

export function decode(s: string): string[] {
  // The leading separator is what tells [] and [""] apart: one encodes to the
  // empty string, the other to a lone separator.
  if (s === "") return [];
  const out: string[] = [];
  let current = "";
  let i = 1;
  while (i < s.length) {
    if (s[i] === ESCAPE) {
      current += s[i + 1];
      i += 2;
    } else if (s[i] === SEPARATOR) {
      out.push(current);
      current = "";
      i += 1;
    } else {
      current += s[i];
      i += 1;
    }
  }
  out.push(current);
  return out;
}
