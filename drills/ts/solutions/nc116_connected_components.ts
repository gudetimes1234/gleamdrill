export function countComponents(n: number, edges: number[][]): number {
  // Start with n components and merge: every edge whose ends are not already
  // together removes one. No traversal, no adjacency list -- the count falls
  // straight out of how many merges actually happened.
  const parents = new Map<number, number>();

  const find = (node: number): number => {
    while ((parents.get(node) ?? node) !== node) node = parents.get(node)!;
    return node;
  };

  let merges = 0;
  for (const [a, b] of edges) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) {
      parents.set(rootA, rootB);
      merges++;
    }
  }

  return n - merges;
}
