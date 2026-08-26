import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.minMeetingRooms !== "function") throw new Error("__signature_mismatch__");
  return [
    ["minMeetingRooms([[0, 30], [5, 10], [15, 20]])", show(2), show(solution.minMeetingRooms([[0, 30], [5, 10], [15, 20]]))],
    ["minMeetingRooms([[7, 10], [2, 4]])", show(1), show(solution.minMeetingRooms([[7, 10], [2, 4]]))],
    ["minMeetingRooms([])", show(0), show(solution.minMeetingRooms([]))],
    ["minMeetingRooms([[1, 5], [5, 10]])", show(1), show(solution.minMeetingRooms([[1, 5], [5, 10]]))],
    ["minMeetingRooms(six overlapping meetings)", show(4), show(solution.minMeetingRooms([[1, 10], [2, 7], [3, 19], [8, 12], [10, 20], [11, 30]]))],
  ];
}
