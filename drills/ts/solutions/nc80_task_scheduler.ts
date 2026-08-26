export function leastInterval(tasks: string[], n: number): number {
  if (tasks.length === 0) return 0;

  const counts = new Map<string, number>();
  for (const task of tasks) counts.set(task, (counts.get(task) ?? 0) + 1);

  const frequencies = [...counts.values()];
  const busiest = Math.max(...frequencies);
  const ties = frequencies.filter((count) => count === busiest).length;

  // Lay the most frequent task out first with gaps of n between its copies.
  // That skeleton is (busiest - 1) full frames of n + 1 slots, plus the final
  // row of every task tied for busiest. Everything else either fits into an
  // idle slot or has already pushed the total past the skeleton -- in which
  // case no idling happens and the answer is just the number of tasks.
  return Math.max(tasks.length, (busiest - 1) * (n + 1) + ties);
}
