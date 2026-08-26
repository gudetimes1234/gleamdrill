import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.wordBreak !== "function") throw new Error("__signature_mismatch__");
  return [
    ["wordBreak('leetcode', ['leet', 'code'])", show(true), show(solution.wordBreak('leetcode', ['leet', 'code']))],
    ["wordBreak('applepenapple', ['apple', 'pen'])", show(true), show(solution.wordBreak('applepenapple', ['apple', 'pen']))],
    ["wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])", show(false), show(solution.wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']))],
    ["wordBreak('', ['a'])", show(true), show(solution.wordBreak('', ['a']))],
    ["wordBreak('a', [])", show(false), show(solution.wordBreak('a', []))],
    ["wordBreak('aaaaaaa', ['aaa', 'aaaa'])", show(true), show(solution.wordBreak('aaaaaaa', ['aaa', 'aaaa']))],
  ];
}
