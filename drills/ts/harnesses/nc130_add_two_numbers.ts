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
  if (typeof solution.addTwoNumbers !== "function" || typeof solution.ListNode !== "function") throw new Error("__signature_mismatch__");
  return [
    ["addTwoNumbers([2,4,3], [5,6,4]) -- 342 + 465", show([7, 0, 8]), show(listValues(solution.addTwoNumbers(chain([2, 4, 3]), chain([5, 6, 4]))))],
    ["addTwoNumbers([0], [0])", show([0]), show(listValues(solution.addTwoNumbers(chain([0]), chain([0]))))],
    ["addTwoNumbers([9,9,9], [1]) -- the carry runs all the way", show([0, 0, 0, 1]), show(listValues(solution.addTwoNumbers(chain([9, 9, 9]), chain([1]))))],
    ["addTwoNumbers([5], [5]) -- the carry outlives both", show([0, 1]), show(listValues(solution.addTwoNumbers(chain([5]), chain([5]))))],
    ["addTwoNumbers([1,2], [3,4,5]) -- different lengths", show([4, 6, 5]), show(listValues(solution.addTwoNumbers(chain([1, 2]), chain([3, 4, 5]))))],
  ];
}
