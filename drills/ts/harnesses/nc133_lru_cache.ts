import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.LRUCache !== "function") throw new Error("__signature_mismatch__");

  const cache = new solution.LRUCache(2);
  cache.put(1, 1);
  cache.put(2, 2);
  const first = cache.get(1);
  cache.put(3, 3);
  const evicted = cache.get(2);
  const kept = cache.get(3);
  cache.put(4, 4);

  const updated = new solution.LRUCache(1);
  updated.put(5, 5);
  updated.put(5, 9);

  return [
    ["get(1) after put(1,1), put(2,2)", show(1), show(first)],
    ["get(2) after put(3,3) -- 2 was least recently used", show(-1), show(evicted)],
    ["get(3) after put(3,3)", show(3), show(kept)],
    ["get(1) after put(4,4) -- reading 3 saved it, so 1 went", show(-1), show(cache.get(1))],
    ["get(3) after put(4,4)", show(3), show(cache.get(3))],
    ["get(4) after put(4,4)", show(4), show(cache.get(4))],
    ["get(99) on a key never stored", show(-1), show(cache.get(99))],
    ["get(5) after put(5,5) then put(5,9) -- an update, not an insert", show(9), show(updated.get(5))],
  ];
}
