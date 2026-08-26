export function validTree(n: number, edges: number[][]): boolean {
  // A graph with no nodes at all is vacuously a tree, provided it has no edges
  // either -- worth stating, because the n-1 edge count says otherwise.
  if (n <= 0) return edges.length === 0;

  // A tree is two conditions at once: connected, and no cycles. Checking both
  // separately is unnecessary -- with exactly n-1 edges, connected implies
  // acyclic and acyclic implies connected, so testing the edge count plus
  // either one is enough. Here it is the count plus reachability.
  if (edges.length !== n - 1) return false;

  const adjacency: number[][] = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    adjacency[a].push(b);
    adjacency[b].push(a);
  }

  const seen = new Set<number>();
  const stack = [0];
  while (stack.length) {
    const node = stack.pop()!;
    if (seen.has(node)) continue;
    seen.add(node);
    stack.push(...adjacency[node]);
  }

  return seen.size === n;
}
