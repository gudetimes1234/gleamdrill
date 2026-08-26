export function canCompleteCircuit(gas: number[], cost: number[]): number {
  // Drive the whole loop from each start and see whether the tank ever goes
  // negative. O(n^2) -- the definition, and what the single pass replaces.
  const diffs = gas.map((g, i) => g - cost[i]);

  for (let start = 0; start < diffs.length; start++) {
    const rotated = diffs.slice(start).concat(diffs.slice(0, start));
    let tank = 0;
    let survives = true;
    for (const diff of rotated) {
      tank += diff;
      if (tank < 0) {
        survives = false;
        break;
      }
    }
    if (survives) return start;
  }

  return -1;
}
