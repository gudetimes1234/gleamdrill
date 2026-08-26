import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

// Any valid order is acceptable, so the harness checks the order rather than
// comparing it: every course appears exactly once, and every prerequisite comes
// before the course that needs it.
const valid = (numCourses: number, prerequisites: number[][]) => {
  const order = solution.findOrder(numCourses, prerequisites);
  if (order.length !== numCourses || new Set(order).size !== numCourses) return false;
  const at = new Map(order.map((course, i) => [course, i]));
  return prerequisites.every(([course, prereq]) => at.get(prereq)! < at.get(course)!);
};

export function run(): [string, string, string][] {
  if (typeof solution.findOrder !== "function") throw new Error("__signature_mismatch__");
  return [
    ["findOrder(2, [[1,0]]) is a valid order", show(true), show(valid(2, [[1, 0]]))],
    ["findOrder(4, [[1,0],[2,0],[3,1],[3,2]]) is a valid order", show(true), show(valid(4, [[1, 0], [2, 0], [3, 1], [3, 2]]))],
    ["findOrder(1, []) is a valid order", show(true), show(valid(1, []))],
    ["findOrder(3, []) is a valid order", show(true), show(valid(3, []))],
    ["findOrder(2, [[0,1],[1,0]]) -- a cycle, so no order", show([]), show(solution.findOrder(2, [[0, 1], [1, 0]]))],
    ["findOrder(0, [])", show([]), show(solution.findOrder(0, []))],
  ];
}
