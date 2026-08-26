import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.climbStairs !== "function") throw new Error("__signature_mismatch__");
  return [
    ["climbStairs(2)", show(2), show(solution.climbStairs(2))],
    ["climbStairs(3)", show(3), show(solution.climbStairs(3))],
    ["climbStairs(1)", show(1), show(solution.climbStairs(1))],
    ["climbStairs(0)", show(1), show(solution.climbStairs(0))],
    ["climbStairs(10)", show(89), show(solution.climbStairs(10))],
    ["climbStairs(45)", show(1836311903), show(solution.climbStairs(45))],
  ];
}
