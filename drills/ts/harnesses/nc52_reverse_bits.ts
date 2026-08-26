import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.reverseBits !== "function") throw new Error("__signature_mismatch__");
  return [
    ["reverseBits(43261596)", show(964176192), show(solution.reverseBits(43261596))],
    ["reverseBits(4294967293)", show(3221225471), show(solution.reverseBits(4294967293))],
    ["reverseBits(0)", show(0), show(solution.reverseBits(0))],
    ["reverseBits(1)", show(2147483648), show(solution.reverseBits(1))],
  ];
}
