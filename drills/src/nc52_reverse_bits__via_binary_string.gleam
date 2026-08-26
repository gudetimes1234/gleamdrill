import gleam/int
import gleam/list
import gleam/result
import gleam/string

pub fn reverse_bits(n: Int) -> Int {
  // Write the number out in binary, pad to the full width, reverse the text,
  // read it back. Slower and allocates, but the padding makes the thing the
  // bit version keeps implicit \u{2014} that the width is 32, not however many bits
  // this particular value happens to need \u{2014} impossible to forget.
  let bits = int.to_base_string(n, 2) |> result.unwrap("0")
  let padded = string.repeat("0", 32 - string.length(bits)) <> bits

  padded
  |> string.to_graphemes
  |> list.reverse
  |> string.concat
  |> int.base_parse(2)
  |> result.unwrap(0)
}
