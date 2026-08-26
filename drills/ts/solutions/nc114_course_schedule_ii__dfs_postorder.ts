export function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const needs: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [course, prereq] of prerequisites) needs[course].push(prereq);

  const onPath = new Set<number>();
  const done = new Set<number>();
  const order: number[] = [];

  // Depth-first, recording a course only *after* everything it depends on has
  // been recorded. That post-order is a valid schedule by construction -- no
  // indegrees to maintain -- and the in-progress set doubles as the cycle
  // check, which is what makes the impossible case fall out of the same walk.
  const visit = (course: number): boolean => {
    if (onPath.has(course)) return false;
    if (done.has(course)) return true;
    onPath.add(course);
    for (const prereq of needs[course]) {
      if (!visit(prereq)) return false;
    }
    onPath.delete(course);
    done.add(course);
    order.push(course);
    return true;
  };

  for (let course = 0; course < numCourses; course++) {
    if (!visit(course)) return [];
  }
  return order;
}
