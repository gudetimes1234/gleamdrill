import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.canAttendMeetings !== "function") throw new Error("__signature_mismatch__");
  return [
    ["canAttendMeetings([[0, 30], [5, 10], [15, 20]])", show(false), show(solution.canAttendMeetings([[0, 30], [5, 10], [15, 20]]))],
    ["canAttendMeetings([[7, 10], [2, 4]])", show(true), show(solution.canAttendMeetings([[7, 10], [2, 4]]))],
    ["canAttendMeetings([])", show(true), show(solution.canAttendMeetings([]))],
    ["canAttendMeetings([[1, 5]])", show(true), show(solution.canAttendMeetings([[1, 5]]))],
    ["canAttendMeetings([[1, 5], [5, 10]])", show(true), show(solution.canAttendMeetings([[1, 5], [5, 10]]))],
    ["canAttendMeetings([[5, 10], [1, 6]])", show(false), show(solution.canAttendMeetings([[5, 10], [1, 6]]))],
  ];
}
