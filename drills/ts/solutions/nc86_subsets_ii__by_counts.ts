export function subsetsWithDup(nums: number[]): number[][] {
  // A different framing: the answer is not a choice per *element* but a choice
  // per distinct *value* -- how many copies of it to take, from none up to
  // however many there are. Duplicates then cannot arise at all, so there is no
  // skipping rule to remember.
  const counts = new Map<number, number>();
  for (const value of nums) counts.set(value, (counts.get(value) ?? 0) + 1);

  let subsets: number[][] = [[]];
  for (const [value, count] of [...counts.entries()].sort((a, b) => a[0] - b[0])) {
    subsets = subsets.flatMap((subset) =>
      Array.from({ length: count + 1 }, (_, taken) => [
        ...subset,
        ...Array(taken).fill(value),
      ]),
    );
  }
  return subsets;
}
