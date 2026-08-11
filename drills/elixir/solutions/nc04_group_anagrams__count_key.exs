defmodule Solution do
  def group_anagrams(strs) do
    # A letter tally is anagram-invariant too, and costs O(len) to build rather
    # than O(len log len).
    strs
    |> Enum.group_by(fn s -> s |> String.graphemes() |> Enum.frequencies() end)
    |> Map.values()
  end
end
