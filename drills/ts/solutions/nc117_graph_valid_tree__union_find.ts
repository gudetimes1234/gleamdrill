export function validTree(n: number, edges: number[][]): boolean {
  if (n <= 0) return edges.length === 0;

  // Both conditions from one pass. An edge joining two nodes already connected
  // is a cycle, so if none does, the graph is a forest -- and a forest with n-1
  // merges is a single tree. No adjacency list and no traversal.
  const parents = new Map<number, number>();

  const find = (node: number): number => {
    while ((parents.get(node) ?? node) !== node) node = parents.get(node)!;
    return node;
  };

  let merges = 0;
  for (const [a, b] of edges) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA === rootB) return false;
    parents.set(rootA, rootB);
    merges++;
  }

  return merges === n - 1;
}
