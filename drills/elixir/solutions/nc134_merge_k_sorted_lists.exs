defmodule Solution do
  # Merge in pairs, halving the number of lists each round. Folding them in one
  # at a time re-walks the growing result every time -- O(k*n) -- while pairing
  # gives O(n log k) for the same merges, because each element is copied only
  # once per round and there are log k rounds.
  def merge_k_lists([]), do: []
  def merge_k_lists([only]), do: only
  def merge_k_lists(lists), do: merge_k_lists(pair_up(lists))

  defp pair_up([first, second | rest]), do: [merge(first, second) | pair_up(rest)]
  defp pair_up(rest), do: rest

  defp merge([], rest), do: rest
  defp merge(rest, []), do: rest

  defp merge([a | a_rest] = first, [b | b_rest] = second) do
    if a <= b,
      do: [a | merge(a_rest, second)],
      else: [b | merge(first, b_rest)]
  end
end
