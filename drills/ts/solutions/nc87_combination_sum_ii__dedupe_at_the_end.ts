export function combinationSum2(candidates: number[], target: number): number[][] {
  // Generate every subset that hits the target and collapse the repeats
  // afterwards. Correct, and exponentially wasteful on inputs with many equal
  // values -- which is exactly why the skipping rule is worth getting right.
  const seen = new Set<string>();
  const found: number[][] = [];

  for (const subset of everySubset([...candidates].sort((a, b) => a - b))) {
    if (subset.reduce((a, b) => a + b, 0) !== target) continue;
    const key = subset.join(",");
    if (!seen.has(key)) {
      seen.add(key);
      found.push(subset);
    }
  }

  return found;
}

function everySubset(sorted: number[]): number[][] {
  if (sorted.length === 0) return [[]];
  const without = everySubset(sorted.slice(1));
  return [...without.map((subset) => [sorted[0], ...subset]), ...without];
}
