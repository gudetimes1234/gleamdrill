export function networkDelayTime(times: number[][], n: number, k: number): number {
  // Bellman-Ford. No choosing what to settle next: relax every edge, n-1 times
  // over, and the times settle by themselves -- a shortest path is at most n-1
  // edges long, and each round fixes at least one more of them. Slower than
  // Dijkstra at O(V*E), and the reason to know it is that it survives negative
  // edge weights, which Dijkstra's settle-and-never-revisit does not.
  const settled = new Map<number, number>([[k, 0]]);

  for (let round = 0; round < n - 1; round++) {
    for (const [origin, destination, weight] of times) {
      if (!settled.has(origin)) continue;
      const arrival = settled.get(origin)! + weight;
      if (!settled.has(destination) || arrival < settled.get(destination)!) {
        settled.set(destination, arrival);
      }
    }
  }

  return settled.size === n ? Math.max(...settled.values()) : -1;
}
