import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

// LeetCode's level-order form: an array of values with null for a missing
// child, trailing nulls trimmed.
const build = (values: (number | null)[]): any => {
  if (values.length === 0 || values[0] === null) return null;
  const root = new solution.TreeNode(values[0]!);
  const queue: any[] = [root];
  let head = 0;
  let i = 1;
  while (head < queue.length && i < values.length) {
    const node = queue[head++];
    if (i < values.length) {
      const value = values[i++];
      if (value !== null) {
        node.left = new solution.TreeNode(value);
        queue.push(node.left);
      }
    }
    if (i < values.length) {
      const value = values[i++];
      if (value !== null) {
        node.right = new solution.TreeNode(value);
        queue.push(node.right);
      }
    }
  }
  return root;
};

const levels = (node: any): (number | null)[] => {
  const out: (number | null)[] = [];
  const queue: any[] = [node];
  let head = 0;
  while (head < queue.length && out.length < 500) {
    const current = queue[head++];
    if (current === null || current === undefined) {
      out.push(null);
    } else {
      out.push(current.val);
      queue.push(current.left ?? null);
      queue.push(current.right ?? null);
    }
  }
  while (out.length > 0 && out[out.length - 1] === null) out.pop();
  return out;
};

export function run(): [string, string, string][] {
  if (typeof solution.maxPathSum !== "function" || typeof solution.TreeNode !== "function") throw new Error("__signature_mismatch__");
  return [
    ["maxPathSum([1,2,3])", show(6), show(solution.maxPathSum(build([1, 2, 3])))],
    ["maxPathSum([-10,9,20,null,null,15,7])", show(42), show(solution.maxPathSum(build([-10, 9, 20, null, null, 15, 7])))],
    ["maxPathSum([-3]) -- a single negative node", show(-3), show(solution.maxPathSum(build([-3])))],
    ["maxPathSum([-2,-1]) -- all negative", show(-1), show(solution.maxPathSum(build([-2, -1])))],
    ["maxPathSum([0])", show(0), show(solution.maxPathSum(build([0])))],
  ];
}
