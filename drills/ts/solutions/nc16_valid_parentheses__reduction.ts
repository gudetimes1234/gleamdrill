export function isValid(s: string): boolean {
  let previous = "";
  while (previous !== s) {
    previous = s;
    s = s.replaceAll("()", "").replaceAll("[]", "").replaceAll("{}", "");
  }
  return s === "";
}
