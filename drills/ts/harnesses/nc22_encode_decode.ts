
import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

// Only the round trip is specified: any encoding is fine as long as decode
// undoes it, so every case runs both directions.
const roundTrip = (strs: string[]) => solution.decode(solution.encode(strs));

export function run(): [string, string, string][] {
  if (typeof solution.encode !== "function" || typeof solution.decode !== "function") {
    throw new Error("__signature_mismatch__");
  }
  return [
    ["decode(encode(['neet', 'code', 'love', 'you']))", show(["neet", "code", "love", "you"]), show(roundTrip(["neet", "code", "love", "you"]))],
    ["decode(encode([]))", show([]), show(roundTrip([]))],
    ["decode(encode(['', '']))", show(["", ""]), show(roundTrip(["", ""]))],
    ["decode(encode(['3#x', 'a|b']))", show(["3#x", "a|b"]), show(roundTrip(["3#x", "a|b"]))],
    ["decode(encode(['\\\\', '|', '#']))", show(["\\", "|", "#"]), show(roundTrip(["\\", "|", "#"]))],
  ];
}
