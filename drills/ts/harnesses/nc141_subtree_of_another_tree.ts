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
  if (typeof solution.isSubtree !== "function" || typeof solution.TreeNode !== "function") throw new Error("__signature_mismatch__");
  return [
    ["isSubtree([3,4,5,1,2], [4,1,2])", show(true), show(solution.isSubtree(build([3, 4, 5, 1, 2]), build([4, 1, 2])))],
    ["isSubtree(a near match with an extra node)", show(false), show(solution.isSubtree(build([3, 4, 5, 1, 2, null, null, null, null, 0]), build([4, 1, 2])))],
    ["isSubtree([1], [1]) -- a tree is its own subtree", show(true), show(solution.isSubtree(build([1]), build([1])))],
    ["isSubtree([], [1])", show(false), show(solution.isSubtree(build([]), build([1])))],
    ["isSubtree([1], []) -- the empty tree is in everything", show(true), show(solution.isSubtree(build([1]), build([])))],
  ];
}
