export function threeSum(nums: number[]): number[][] {
  // Every triple, checked. Sorting first means each triple comes out in
  // ascending order, so duplicates are plain string equality on the triple.
  const ordered = [...nums].sort((a, b) => a - b);
  const seen = new Set<string>();
  const result: number[][] = [];

  for (let i = 0; i < ordered.length; i++) {
    for (let j = i + 1; j < ordered.length; j++) {
      for (let k = j + 1; k < ordered.length; k++) {
        if (ordered[i] + ordered[j] + ordered[k] !== 0) continue;
        const triple = [ordered[i], ordered[j], ordered[k]];
        const key = triple.join(",");
        if (seen.has(key)) continue;
        seen.add(key);
        result.push(triple);
      }
    }
  }

  return result;
}
