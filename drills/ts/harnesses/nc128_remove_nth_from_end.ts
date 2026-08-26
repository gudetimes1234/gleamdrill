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

export function run(): [string, string, string][] {
  if (typeof solution.removeNthFromEnd !== "function" || typeof solution.ListNode !== "function") throw new Error("__signature_mismatch__");
  return [
    ["removeNthFromEnd([1,2,3,4,5], 2)", show([1, 2, 3, 5]), show(listValues(solution.removeNthFromEnd(chain([1, 2, 3, 4, 5]), 2)))],
    ["removeNthFromEnd([1], 1)", show([]), show(listValues(solution.removeNthFromEnd(chain([1]), 1)))],
    ["removeNthFromEnd([1,2], 1)", show([1]), show(listValues(solution.removeNthFromEnd(chain([1, 2]), 1)))],
    ["removeNthFromEnd([1,2], 2) -- the head goes", show([2]), show(listValues(solution.removeNthFromEnd(chain([1, 2]), 2)))],
    ["removeNthFromEnd([1,2,3], 5) -- nothing to remove", show([1, 2, 3]), show(listValues(solution.removeNthFromEnd(chain([1, 2, 3]), 5)))],
  ];
}
