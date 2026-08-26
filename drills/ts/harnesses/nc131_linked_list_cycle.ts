import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

// pos is the index the tail links back to, or null for a list that ends.
const chain = (values: number[], pos: number | null) => {
  const nodes = values.map((value) => new solution.ListNode(value));
  nodes.forEach((node: any, i: number) => {
    node.next = i + 1 < nodes.length ? nodes[i + 1] : null;
  });
  if (nodes.length > 0 && pos !== null) (nodes[nodes.length - 1] as any).next = nodes[pos];
  return nodes.length > 0 ? nodes[0] : null;
};

export function run(): [string, string, string][] {
  if (typeof solution.hasCycle !== "function" || typeof solution.ListNode !== "function") throw new Error("__signature_mismatch__");
  return [
    ["hasCycle([3,2,0,-4], tail -> index 1)", show(true), show(solution.hasCycle(chain([3, 2, 0, -4], 1)))],
    ["hasCycle([1,2], no cycle)", show(false), show(solution.hasCycle(chain([1, 2], null)))],
    ["hasCycle([1], no cycle)", show(false), show(solution.hasCycle(chain([1], null)))],
    ["hasCycle([1], tail -> index 0)", show(true), show(solution.hasCycle(chain([1], 0)))],
    ["hasCycle([])", show(false), show(solution.hasCycle(chain([], null)))],
    ["hasCycle([1,2], tail -> index 0)", show(true), show(solution.hasCycle(chain([1, 2], 0)))],
  ];
}
