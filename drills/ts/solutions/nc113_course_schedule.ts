export function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // Kahn's algorithm. Courses with nothing outstanding can be taken now; taking
  // one releases whatever depended on it. If the process stalls with courses
  // left, those courses depend on each other in a circle -- a cycle is exactly
  // what "cannot be finished" means.
  const waiting = new Array<number>(numCourses).fill(0);
  const unlocks: number[][] = Array.from({ length: numCourses }, () => []);

  for (const [course, prereq] of prerequisites) {
    waiting[course]++;
    unlocks[prereq].push(course);
  }

  const ready: number[] = [];
  for (let c = 0; c < numCourses; c++) if (waiting[c] === 0) ready.push(c);

  let head = 0;
  let taken = 0;
  while (head < ready.length) {
    const course = ready[head++];
    taken++;
    for (const following of unlocks[course]) {
      if (--waiting[following] === 0) ready.push(following);
    }
  }

  return taken === numCourses;
}
