import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.evalRPN !== "function") throw new Error("__signature_mismatch__");
  return [
    ["evalRPN(['2', '1', '+', '3', '*'])", show(9), show(solution.evalRPN(["2", "1", "+", "3", "*"]))],
    ["evalRPN(['4', '13', '5', '/', '+'])", show(6), show(solution.evalRPN(["4", "13", "5", "/", "+"]))],
    ["evalRPN(['-3', '2', '/'])", show(-1), show(solution.evalRPN(["-3", "2", "/"]))],
    ["evalRPN(['5'])", show(5), show(solution.evalRPN(["5"]))],
    ["evalRPN(the long one)", show(22), show(solution.evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]))],
  ];
}
