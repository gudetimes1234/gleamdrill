import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

// Builds a list from [value, randomIndex] pairs, where randomIndex is null for
// no link.
const build = (pairs: [number, number | null][]) => {
  const nodes = pairs.map(([value]) => new solution.Node(value));
  nodes.forEach((node: any, i: number) => {
    node.next = i + 1 < nodes.length ? nodes[i + 1] : null;
    const random = pairs[i][1];
    node.random = random === null ? null : nodes[random];
  });
  return nodes.length > 0 ? nodes[0] : null;
};

// Serialises back to [value, randomIndex] pairs, and asserts along the way that
// every node is a *new* one -- a copy that reuses the originals would otherwise
// pass every value comparison.
const copied = (pairs: [number, number | null][]) => {
  const head = build(pairs);
  const originals = new Set<any>();
  for (let node: any = head; node !== null; node = node.next) originals.add(node);

  const nodes: any[] = [];
  for (let node: any = solution.copyRandomList(head); node !== null && node !== undefined && nodes.length < 1000; node = node.next) {
    nodes.push(node);
  }
  if (nodes.some((node) => originals.has(node))) return "reused an original node";
  const places = new Map<any, number>(nodes.map((node, i) => [node, i]));
  return nodes.map((node) => [node.val, node.random === null ? null : places.get(node.random) ?? null]);
};

export function run(): [string, string, string][] {
  if (typeof solution.copyRandomList !== "function" || typeof solution.Node !== "function") throw new Error("__signature_mismatch__");
  return [
    ["copyRandomList([[7,null],[13,0]])", show([[7, null], [13, 0]]), show(copied([[7, null], [13, 0]]))],
    ["copyRandomList([[1,0]]) -- a node pointing at itself", show([[1, 0]]), show(copied([[1, 0]]))],
    ["copyRandomList(a forward link to a node not yet copied)", show([[1, 2], [2, null], [3, 0]]), show(copied([[1, 2], [2, null], [3, 0]]))],
    ["copyRandomList([])", show([]), show(copied([]))],
  ];
}
