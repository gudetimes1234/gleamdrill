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

const merged = (lists: number[][]) =>
  listValues(solution.mergeKLists(lists.map((values) => chain(values))));

export function run(): [string, string, string][] {
  if (typeof solution.mergeKLists !== "function" || typeof solution.ListNode !== "function") throw new Error("__signature_mismatch__");
  return [
    ["mergeKLists([[1,4,5],[1,3,4],[2,6]])", show([1, 1, 2, 3, 4, 4, 5, 6]), show(merged([[1, 4, 5], [1, 3, 4], [2, 6]]))],
    ["mergeKLists([]) -- no lists at all", show([]), show(merged([]))],
    ["mergeKLists([[]]) -- one empty list", show([]), show(merged([[]]))],
    ["mergeKLists([[1],[],[0]])", show([0, 1]), show(merged([[1], [], [0]]))],
    ["mergeKLists([[2,2],[2]]) -- ties everywhere", show([2, 2, 2]), show(merged([[2, 2], [2]]))],
  ];
}
