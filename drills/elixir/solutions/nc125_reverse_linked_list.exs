defmodule Solution do
  # The accumulator *is* the reversed list being built, and prepending to it is
  # exactly the pointer rewiring the imperative version does one node at a time.
  # Nothing is ever traversed twice, so it is one pass and no extra memory
  # beyond the result.
  def reverse_list(values), do: walk(values, [])

  defp walk([], reversed), do: reversed
  defp walk([head | tail], reversed), do: walk(tail, [head | reversed])
end
