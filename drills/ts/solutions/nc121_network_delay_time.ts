export function networkDelayTime(times: number[][], n: number, k: number): number {
  const edges = new Map<number, [number, number][]>();
  for (const [origin, destination, weight] of times) {
    if (!edges.has(origin)) edges.set(origin, []);
    edges.get(origin)!.push([destination, weight]);
  }

  // Dijkstra's algorithm. The frontier holds tentative arrival times; taking
  // the smallest one settles that node for good, because every other route to
  // it would have to start with an edge at least as long. JavaScript has no
  // heap in the standard library, so the smallest is found by a scan -- O(V^2)
  // rather than O(E log V), which is the better shape anyway when the graph is
  // dense.
  const settled = new Map<number, number>();
  let frontier: [number, number][] = [[k, 0]];

  while (frontier.length) {
    let best = 0;
    for (let i = 1; i < frontier.length; i++) if (frontier[i][1] < frontier[best][1]) best = i;
    const [node, at] = frontier[best];
    frontier = frontier.filter((entry) => entry[0] !== node);
    if (settled.has(node)) continue;
    settled.set(node, at);
    for (const [destination, weight] of edges.get(node) ?? []) {
      if (!settled.has(destination)) frontier.push([destination, at + weight]);
    }
  }

  // Every node has to have heard the signal, and the answer is the last one to.
  return settled.size === n ? Math.max(...settled.values()) : -1;
}
