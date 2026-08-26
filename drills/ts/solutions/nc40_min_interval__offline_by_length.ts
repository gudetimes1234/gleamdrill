export function minInterval(intervals: number[][], queries: number[]): number[] {
  // Answer each query once, and never revisit it. Taking the intervals shortest
  // first means the first interval to cover a query is already its answer, so
  // every query leaves the pool the moment it is settled and the pool only ever
  // shrinks.
  const answers = new Array<number>(queries.length).fill(-1);
  let waiting = queries.map((query, index) => [index, query] as [number, number]);

  const byLength = [...intervals].sort((a, b) => a[1] - a[0] - (b[1] - b[0]));

  for (const [start, end] of byLength) {
    const stillWaiting: [number, number][] = [];
    for (const [index, query] of waiting) {
      if (start <= query && query <= end) answers[index] = end - start + 1;
      else stillWaiting.push([index, query]);
    }
    waiting = stillWaiting;
  }

  return answers;
}
