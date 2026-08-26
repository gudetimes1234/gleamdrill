export function cloneGraph(adjacency: number[][], start: number): number[][] {
  if (start < 0 || start >= adjacency.length) return [];

  const reached = new Set<number>();

  // Depth-first. The node is marked *before* recursing into its neighbours,
  // which is what makes a cycle terminate -- marking afterwards would let the
  // traversal reach the same node again while it was still being visited.
  const visit = (node: number) => {
    if (reached.has(node) || node < 0 || node >= adjacency.length) return;
    reached.add(node);
    for (const neighbour of adjacency[node]) visit(neighbour);
  };

  visit(start);
  return renumber(adjacency, reached);
}

function renumber(adjacency: number[][], reached: Set<number>): number[][] {
  const ordered = [...reached].sort((a, b) => a - b);
  const numbering = new Map(ordered.map((node, i) => [node, i]));
  return ordered.map((node) =>
    adjacency[node].filter((n) => numbering.has(n)).map((n) => numbering.get(n)!),
  );
}
