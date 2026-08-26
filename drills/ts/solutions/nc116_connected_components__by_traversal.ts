export function countComponents(n: number, edges: number[][]): number {
  const adjacency: number[][] = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    adjacency[a].push(b);
    adjacency[b].push(a);
  }

  // One search per unvisited node, exactly as with islands on a grid -- the
  // same counting-components idea with an adjacency list instead of
  // coordinates. Worth seeing side by side with union-find: this one needs the
  // whole graph up front, the other can take edges as they arrive.
  const seen = new Set<number>();
  let count = 0;

  for (let node = 0; node < n; node++) {
    if (seen.has(node)) continue;
    count++;
    const stack = [node];
    while (stack.length) {
      const current = stack.pop()!;
      if (seen.has(current)) continue;
      seen.add(current);
      stack.push(...adjacency[current]);
    }
  }

  return count;
}
