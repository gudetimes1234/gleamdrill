export function cloneGraph(adjacency: number[][], start: number): number[][] {
  if (start < 0 || start >= adjacency.length) return [];

  // The set of nodes already dealt with is the whole problem. Without it a
  // cycle sends the traversal round forever; with it, a node already reached is
  // simply skipped. Only the component containing the start is copied, which is
  // what the reachable set also decides.
  const reached = new Set<number>();
  const frontier = [start];
  while (frontier.length) {
    const node = frontier.shift()!;
    if (reached.has(node) || node < 0 || node >= adjacency.length) continue;
    reached.add(node);
    frontier.push(...adjacency[node]);
  }

  return renumber(adjacency, reached);
}

// Reachable nodes renumbered by their original index, ascending. Numbering by
// *discovery* order would make the answer depend on whether the traversal was
// breadth- or depth-first, which is not part of the problem.
function renumber(adjacency: number[][], reached: Set<number>): number[][] {
  const ordered = [...reached].sort((a, b) => a - b);
  const numbering = new Map(ordered.map((node, i) => [node, i]));
  return ordered.map((node) =>
    adjacency[node].filter((n) => numbering.has(n)).map((n) => numbering.get(n)!),
  );
}
