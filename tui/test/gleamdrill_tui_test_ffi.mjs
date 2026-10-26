import { Ok, Error } from "./gleam.mjs";

// The first grapheme and the rest, for typing a line key by key.
export function pop(text) {
  const [first, ...rest] = [...new Intl.Segmenter().segment(text)].map((s) => s.segment);
  return first === undefined ? new Error(undefined) : new Ok([first, rest.join("")]);
}
