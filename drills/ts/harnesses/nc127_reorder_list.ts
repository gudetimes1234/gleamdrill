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

// reorderList rewrites the list in place, so the head it was given is the
// answer whether or not it also returns one.
const reordered = (values: number[]) => {
  const head = chain(values);
  const returned = solution.reorderList(head);
  return listValues(head !== null ? head : returned);
};

export function run(): [string, string, string][] {
  if (typeof solution.reorderList !== "function" || typeof solution.ListNode !== "function") throw new Error("__signature_mismatch__");
  return [
    ["reorderList([1,2,3,4])", show([1, 4, 2, 3]), show(reordered([1, 2, 3, 4]))],
    ["reorderList([1,2,3,4,5]) -- the middle stays last", show([1, 5, 2, 4, 3]), show(reordered([1, 2, 3, 4, 5]))],
    ["reorderList([1,2])", show([1, 2]), show(reordered([1, 2]))],
    ["reorderList([1])", show([1]), show(reordered([1]))],
    ["reorderList([])", show([]), show(reordered([]))],
  ];
}
