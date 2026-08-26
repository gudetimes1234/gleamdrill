export function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const needs: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [course, prereq] of prerequisites) needs[course].push(prereq);

  const onPath = new Set<number>();
  const done = new Set<number>();

  // Depth-first with three states rather than two. "Seen" is not enough: a node
  // reached twice down *different* branches is fine, while a node reached again
  // while still on the current path is a cycle. The in-progress set is what
  // tells those apart.
  const visit = (course: number): boolean => {
    if (onPath.has(course)) return false;
    if (done.has(course)) return true;
    onPath.add(course);
    for (const prereq of needs[course]) {
      if (!visit(prereq)) return false;
    }
    onPath.delete(course);
    done.add(course);
    return true;
  };

  for (let course = 0; course < numCourses; course++) {
    if (!visit(course)) return false;
  }
  return true;
}
