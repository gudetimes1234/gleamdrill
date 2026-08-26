export function findRedundantConnection(edges: number[][]): number[] {
  // n nodes and n edges means exactly one cycle. Union-find spots it the moment
  // an edge joins two nodes already connected -- and because the edges are
  // processed in order, the first such edge is the last one that could be
  // removed, which is what the problem asks for.
  const parents = new Map<number, number>();

  const find = (node: number): number => {
    while ((parents.get(node) ?? node) !== node) node = parents.get(node)!;
    return node;
  };

  let found: number[] = [];
  for (const [a, b] of edges) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA === rootB) found = [a, b];
    else parents.set(rootA, rootB);
  }

  return found;
}
