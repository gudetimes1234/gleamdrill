export function partitionLabels(s: string): number[] {
  // Overwriting as we go leaves each character mapped to its last position.
  const last = new Map<string, number>();
  for (let i = 0; i < s.length; i++) last.set(s[i], i);

  // A piece can only end where every character it contains has run out. Extend
  // the end to the furthest last-position seen; when the walk catches up with
  // it, the piece is closed.
  const out: number[] = [];
  let start = 0;
  let end = -1;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last.get(s[i])!);
    if (i === end) {
      out.push(end - start + 1);
      start = i + 1;
    }
  }

  return out;
}
