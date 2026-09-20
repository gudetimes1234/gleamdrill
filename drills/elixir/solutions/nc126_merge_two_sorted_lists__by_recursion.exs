defmodule Solution do
  # Take the smaller head and recurse on the rest. Because both inputs are
  # already sorted, whichever head is smaller is smaller than everything still
  # to come -- no comparison beyond the two fronts is ever needed.
  def merge_two_lists([], rest), do: rest
  def merge_two_lists(rest, []), do: rest

  def merge_two_lists([a | a_rest] = first, [b | b_rest] = second) do
    if a <= b,
      do: [a | merge_two_lists(a_rest, second)],
      else: [b | merge_two_lists(first, b_rest)]
  end
end
