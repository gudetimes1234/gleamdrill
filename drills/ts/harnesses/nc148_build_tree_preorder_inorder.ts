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
  if (typeof solution.buildTree !== "function" || typeof solution.TreeNode !== "function") throw new Error("__signature_mismatch__");
  return [
    ["buildTree([3,9,20,15,7], [9,3,15,20,7])", show([3, 9, 20, null, null, 15, 7]), show(levels(solution.buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])))],
    ["buildTree([], [])", show([]), show(levels(solution.buildTree([], [])))],
    ["buildTree([-1], [-1])", show([-1]), show(levels(solution.buildTree([-1], [-1])))],
    ["buildTree([1,2,3], [3,2,1]) -- leaning left", show([1, 2, null, 3]), show(levels(solution.buildTree([1, 2, 3], [3, 2, 1])))],
    ["buildTree([1,2,3], [1,2,3]) -- leaning right", show([1, null, 2, null, 3]), show(levels(solution.buildTree([1, 2, 3], [1, 2, 3])))],
  ];
}
