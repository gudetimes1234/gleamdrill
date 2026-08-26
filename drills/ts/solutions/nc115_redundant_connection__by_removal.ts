export function findRedundantConnection(edges: number[][]): number[] {
  // Try removing each edge, latest first, and keep the first removal that
  // leaves a tree. O(n^2) against union-find's near-linear, but it needs no new
  // structure -- and it says the specification outright: the answer is the last
  // edge whose absence would make the graph a tree.
  const nodes = new Set(edges.flat());

  for (let i = edges.length - 1; i >= 0; i--) {
    const remaining = edges.filter((_edge, j) => j !== i);
    if (isTree(remaining, nodes)) return edges[i];
  }

  return [];
}

function isTree(edges: number[][], nodes: Set<number>): boolean {
  if (nodes.size === 0) return true;
  if (edges.length !== nodes.size - 1) return false;

  const adjacency = new Map<number, number[]>();
  for (const node of nodes) adjacency.set(node, []);
  for (const [a, b] of edges) {
    adjacency.get(a)!.push(b);
    adjacency.get(b)!.push(a);
  }

  const seen = new Set<number>();
  const stack = [[...nodes][0]];
  while (stack.length) {
    const node = stack.pop()!;
    if (seen.has(node)) continue;
    seen.add(node);
    stack.push(...(adjacency.get(node) ?? []));
  }

  return seen.size === nodes.size;
}
