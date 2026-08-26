export function partitionLabels(s: string): number[] {
  // Grow the piece one character at a time until nothing inside it also appears
  // in what is left. No last-position map -- the tail is asked directly -- which
  // is far slower but is the condition stated outright.
  const out: number[] = [];
  let rest = s;
  while (rest.length) {
    let size = 1;
    while ([...rest.slice(0, size)].some((c) => rest.slice(size).includes(c))) size++;
    out.push(size);
    rest = rest.slice(size);
  }
  return out;
}
