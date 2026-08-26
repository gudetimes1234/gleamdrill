import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.reverse !== "function") throw new Error("__signature_mismatch__");
  return [
    ["reverse(123)", show(321), show(solution.reverse(123))],
    ["reverse(-123)", show(-321), show(solution.reverse(-123))],
    ["reverse(120)", show(21), show(solution.reverse(120))],
    ["reverse(0)", show(0), show(solution.reverse(0))],
    ["reverse(1534236469)", show(0), show(solution.reverse(1534236469))],
    ["reverse(-2147483648)", show(0), show(solution.reverse(-2147483648))],
    ["reverse(1463847412)", show(2147483641), show(solution.reverse(1463847412))],
  ];
}
