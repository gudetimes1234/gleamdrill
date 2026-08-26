import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.Trie !== "function") throw new Error("__signature_mismatch__");

  const t = new solution.Trie();
  t.insert("apple");

  const cases: [string, string, string][] = [
    ["search('apple') after inserting it", show(true), show(t.search("apple"))],
    ["search('app') -- a prefix, not a word", show(false), show(t.search("app"))],
    ["startsWith('app')", show(true), show(t.startsWith("app"))],
  ];

  t.insert("app");
  cases.push(["search('app') after inserting it too", show(true), show(t.search("app"))]);
  cases.push(["startsWith('apz')", show(false), show(t.startsWith("apz"))]);
  cases.push(["search('') on an empty trie", show(false), show(new solution.Trie().search(""))]);
  cases.push(["startsWith('') on an empty trie", show(true), show(new solution.Trie().startsWith(""))]);

  return cases;
}
