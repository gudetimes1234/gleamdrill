// The lesson list is a compile-time constant; see problems_ffi.mjs for why the
// memo lives in JavaScript rather than Gleam.
let cache;

export function memo(build) {
  if (cache === undefined) cache = build();
  return cache;
}
