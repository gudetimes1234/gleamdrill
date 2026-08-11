export function isValid(s: string): boolean {
  // No stack: strip every matched pair, over and over, until nothing more can
  // go. Whatever survives is unmatched. It is also why "([)]" fails — neither
  // pair is ever adjacent.
  let previous = "";
  while (previous !== s) {
    previous = s;
    s = s.replaceAll("()", "").replaceAll("[]", "").replaceAll("{}", "");
  }
  return s === "";
}
