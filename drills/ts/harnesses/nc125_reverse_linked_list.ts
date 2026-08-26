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
  if (typeof solution.reverseList !== "function" || typeof solution.ListNode !== "function") throw new Error("__signature_mismatch__");
  return [
    ["reverseList([1,2,3,4,5])", show([5, 4, 3, 2, 1]), show(listValues(solution.reverseList(chain([1, 2, 3, 4, 5]))))],
    ["reverseList([1,2])", show([2, 1]), show(listValues(solution.reverseList(chain([1, 2]))))],
    ["reverseList([]) -- an empty list", show([]), show(listValues(solution.reverseList(chain([]))))],
    ["reverseList([7])", show([7]), show(listValues(solution.reverseList(chain([7]))))],
  ];
}
