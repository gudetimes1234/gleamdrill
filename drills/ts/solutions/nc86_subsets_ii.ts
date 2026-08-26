export function subsetsWithDup(nums: number[]): number[][] {
  return build([...nums].sort((a, b) => a - b));
}

// Sorting puts equal values next to each other, which is what makes the
// duplicate rule expressible: when the head is skipped, skip *every* copy of it
// at once. Skipping one copy and keeping the next would rebuild the same subset
// by a different route.
function build(sorted: number[]): number[][] {
  if (sorted.length === 0) return [[]];

  const first = sorted[0];
  const withFirst = build(sorted.slice(1)).map((subset) => [first, ...subset]);

  let past = 1;
  while (past < sorted.length && sorted[past] === first) past++;

  return [...withFirst, ...build(sorted.slice(past))];
}
