import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

const chain = (values: number[]) => {
  let head: any = null;
  for (let i = values.length - 1; i >= 0; i--) head = new solution.ListNode(values[i], head);
  return head;
};

const listValues = (node: any) => {
  const out: number[] = [];
  while (node !== null && node !== undefined && out.length < 1000) {
    out.push(node.val);
    node = node.next;
  }
  return out;
};

const grouped = (values: number[], k: number) =>
  listValues(solution.reverseKGroup(chain(values), k));

export function run(): [string, string, string][] {
  if (typeof solution.reverseKGroup !== "function" || typeof solution.ListNode !== "function") throw new Error("__signature_mismatch__");
  return [
    ["reverseKGroup([1,2,3,4,5], 2)", show([2, 1, 4, 3, 5]), show(grouped([1, 2, 3, 4, 5], 2))],
    ["reverseKGroup([1,2,3,4,5], 3) -- the last two are left alone", show([3, 2, 1, 4, 5]), show(grouped([1, 2, 3, 4, 5], 3))],
    ["reverseKGroup([1,2,3,4], 4)", show([4, 3, 2, 1]), show(grouped([1, 2, 3, 4], 4))],
    ["reverseKGroup([1,2,3], 1) -- nothing changes", show([1, 2, 3]), show(grouped([1, 2, 3], 1))],
    ["reverseKGroup([1,2], 5) -- the group never fills", show([1, 2]), show(grouped([1, 2], 5))],
    ["reverseKGroup([], 2)", show([]), show(grouped([], 2))],
  ];
}
