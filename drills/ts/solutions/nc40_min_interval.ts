export function minInterval(intervals: number[][], queries: number[]): number[] {
  return queries.map((query) => {
    const lengths = intervals
      .filter(([start, end]) => start <= query && query <= end)
      .map(([start, end]) => end - start + 1);
    return lengths.length ? Math.min(...lengths) : -1;
  });
}
