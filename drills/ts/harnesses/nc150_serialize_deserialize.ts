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

// The format is free, so what is checked is the round trip.
const roundTrip = (values: (number | null)[]) =>
  levels(solution.deserialize(solution.serialize(build(values))));

export function run(): [string, string, string][] {
  if (typeof solution.serialize !== "function" || typeof solution.deserialize !== "function" || typeof solution.TreeNode !== "function") throw new Error("__signature_mismatch__");
  return [
    ["deserialize(serialize([1,2,3,null,null,4,5]))", show([1, 2, 3, null, null, 4, 5]), show(roundTrip([1, 2, 3, null, null, 4, 5]))],
    ["deserialize(serialize([]))", show([]), show(roundTrip([]))],
    ["deserialize(serialize([0]))", show([0]), show(roundTrip([0]))],
    ["deserialize(serialize(a lopsided tree))", show([1, 2, null, 3, null, null, 4]), show(roundTrip([1, 2, null, 3, null, null, 4]))],
    ["deserialize(serialize([-1,-2,-3])) -- negatives survive", show([-1, -2, -3]), show(roundTrip([-1, -2, -3]))],
  ];
}
