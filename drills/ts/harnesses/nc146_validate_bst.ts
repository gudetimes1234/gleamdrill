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
  if (typeof solution.isValidBST !== "function" || typeof solution.TreeNode !== "function") throw new Error("__signature_mismatch__");
  return [
    ["isValidBST([2,1,3])", show(true), show(solution.isValidBST(build([2, 1, 3])))],
    ["isValidBST([])", show(true), show(solution.isValidBST(build([])))],
    ["isValidBST([1])", show(true), show(solution.isValidBST(build([1])))],
    ["isValidBST([5,1,4,null,null,3,6])", show(false), show(solution.isValidBST(build([5, 1, 4, null, null, 3, 6])))],
    ["isValidBST(every node beats its parent, but 3 is on the wrong side)", show(false), show(solution.isValidBST(build([5, 4, 6, null, null, 3, 7])))],
    ["isValidBST([2,2]) -- equal values are not allowed", show(false), show(solution.isValidBST(build([2, 2])))],
  ];
}
