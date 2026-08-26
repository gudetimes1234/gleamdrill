export function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  // The same Kahn's algorithm as deciding whether it is possible -- except the
  // order courses come off the ready list *is* the answer. Detecting the cycle
  // and producing the schedule are the same computation.
  const waiting = new Array<number>(numCourses).fill(0);
  const unlocks: number[][] = Array.from({ length: numCourses }, () => []);

  for (const [course, prereq] of prerequisites) {
    waiting[course]++;
    unlocks[prereq].push(course);
  }

  const order: number[] = [];
  for (let c = 0; c < numCourses; c++) if (waiting[c] === 0) order.push(c);

  let head = 0;
  while (head < order.length) {
    const course = order[head++];
    for (const following of unlocks[course]) {
      if (--waiting[following] === 0) order.push(following);
    }
  }

  // Stalled with courses left, so no order exists at all.
  return order.length === numCourses ? order : [];
}
