export function leastInterval(tasks: string[], n: number): number {
  // Run the schedule instead of computing it. Each round runs the n + 1 most
  // frequent tasks still outstanding -- the greedy choice, and it needs the
  // collection to hand back its largest values over and over, exactly the
  // heap's job. Note the zeros are dropped before each round: a finished task
  // is not an idle slot, and counting it as one is the easy mistake here.
  const counts = new Map<string, number>();
  for (const task of tasks) counts.set(task, (counts.get(task) ?? 0) + 1);

  let remaining = [...counts.values()];
  let elapsed = 0;

  for (;;) {
    const outstanding = remaining.filter((count) => count > 0).sort((a, b) => b - a);
    if (outstanding.length === 0) return elapsed;

    const running = outstanding.slice(0, n + 1);
    remaining = running.map((count) => count - 1).concat(outstanding.slice(n + 1));

    // The last round costs only as many ticks as it actually uses.
    elapsed += remaining.some((count) => count > 0) ? n + 1 : running.length;
  }
}
