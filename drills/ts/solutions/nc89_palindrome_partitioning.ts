export function partition(s: string): string[][] {
  return build(s);
}

// Every partition starts with some palindromic prefix, so the choice at each
// step is only how long that prefix is. Cutting there and recursing on the rest
// reaches each partition exactly once, in order, with nothing to dedupe.
function build(remaining: string): string[][] {
  if (remaining === "") return [[]];

  const out: string[][] = [];
  for (let size = 1; size <= remaining.length; size++) {
    const prefix = remaining.slice(0, size);
    if (prefix !== [...prefix].reverse().join("")) continue;
    for (const rest of build(remaining.slice(size))) out.push([prefix, ...rest]);
  }
  return out;
}
