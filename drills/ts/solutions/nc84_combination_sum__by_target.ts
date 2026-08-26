export function combinationSum(candidates: number[], target: number): number[][] {
  const usable = candidates.filter((c) => c > 0).sort((a, b) => a - b);

  // Bottom-up instead of by recursion: the combinations making a target are
  // every combination making a smaller amount with one more candidate added.
  // Requiring each added candidate to be no smaller than the combination's
  // largest is what keeps one combination from appearing in several orders.
  const table = new Map<number, number[][]>([[0, [[]]]]);

  for (let amount = 1; amount <= target; amount++) {
    const found: number[][] = [];
    for (const candidate of usable) {
      if (candidate > amount) break;
      for (const combination of table.get(amount - candidate) ?? []) {
        if (combination.length === 0 || candidate >= combination[0]) {
          found.push([candidate, ...combination]);
        }
      }
    }
    table.set(amount, found);
  }

  return table.get(target) ?? [];
}
