export function findCheapestPrice(
  n: number,
  flights: number[][],
  src: number,
  dst: number,
  k: number,
): number {
  // Bellman-Ford, stopped after k+1 rounds -- one round is one flight, so the
  // round count *is* the stop limit. Each round reads the previous round's
  // costs from a snapshot rather than from the table being written; without
  // that, two flights could be taken within a single round and the limit would
  // leak.
  let costs = new Map<number, number>([[src, 0]]);

  for (let round = 0; round <= k; round++) {
    const previous = new Map(costs);
    for (const [origin, destination, price] of flights) {
      if (!previous.has(origin)) continue;
      const total = previous.get(origin)! + price;
      if (!costs.has(destination) || total < costs.get(destination)!) {
        costs.set(destination, total);
      }
    }
  }

  return costs.get(dst) ?? -1;
}
