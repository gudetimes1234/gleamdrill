import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.TimeMap !== "function") throw new Error("__signature_mismatch__");

  const store = new solution.TimeMap();
  store.set("foo", "bar", 1);

  const cases: [string, string, string][] = [
    ["get('foo', 1) after set at 1", show("bar"), show(store.get("foo", 1))],
    ["get('foo', 3) with only the value at 1", show("bar"), show(store.get("foo", 3))],
  ];

  store.set("foo", "bar2", 4);

  cases.push(["get('foo', 4) after set at 4", show("bar2"), show(store.get("foo", 4))]);
  cases.push(["get('foo', 5) after set at 4", show("bar2"), show(store.get("foo", 5))]);
  cases.push(["get('foo', 3) still sees the older value", show("bar"), show(store.get("foo", 3))]);
  cases.push(["get('foo', 0) before anything was set", show(""), show(store.get("foo", 0))]);
  cases.push(["get('missing', 1)", show(""), show(store.get("missing", 1))]);

  return cases;
}
