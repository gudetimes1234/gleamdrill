export function canCompleteCircuit(gas: number[], cost: number[]): number {
  if (gas.length === 0) return -1;

  // Two facts do all the work. If the total gas is short of the total cost no
  // start works at all; and if the tank runs dry between i and j, no station in
  // between can start either, so the search jumps straight to j + 1.
  let total = 0;
  let tank = 0;
  let start = 0;

  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    tank += diff;
    if (tank < 0) {
      start = i + 1;
      tank = 0;
    }
  }

  return total >= 0 ? start : -1;
}
