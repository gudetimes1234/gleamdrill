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

const bst = build([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]);

export function run(): [string, string, string][] {
  if (typeof solution.lowestCommonAncestor !== "function" || typeof solution.TreeNode !== "function") throw new Error("__signature_mismatch__");
  return [
    ["lowestCommonAncestor(bst, 2, 8)", show(6), show(solution.lowestCommonAncestor(bst, 2, 8))],
    ["lowestCommonAncestor(bst, 2, 4) -- an ancestor counts", show(2), show(solution.lowestCommonAncestor(bst, 2, 4))],
    ["lowestCommonAncestor(bst, 3, 5)", show(4), show(solution.lowestCommonAncestor(bst, 3, 5))],
    ["lowestCommonAncestor(bst, 7, 9)", show(8), show(solution.lowestCommonAncestor(bst, 7, 9))],
    ["lowestCommonAncestor([1], 1, 1)", show(1), show(solution.lowestCommonAncestor(build([1]), 1, 1))],
  ];
}
