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
  if (typeof solution.mergeTwoLists !== "function" || typeof solution.ListNode !== "function") throw new Error("__signature_mismatch__");
  return [
    ["mergeTwoLists([1,2,4], [1,3,4])", show([1, 1, 2, 3, 4, 4]), show(listValues(solution.mergeTwoLists(chain([1, 2, 4]), chain([1, 3, 4]))))],
    ["mergeTwoLists([], [])", show([]), show(listValues(solution.mergeTwoLists(chain([]), chain([]))))],
    ["mergeTwoLists([], [0])", show([0]), show(listValues(solution.mergeTwoLists(chain([]), chain([0]))))],
    ["mergeTwoLists([5], [1,2,3])", show([1, 2, 3, 5]), show(listValues(solution.mergeTwoLists(chain([5]), chain([1, 2, 3]))))],
  ];
}
