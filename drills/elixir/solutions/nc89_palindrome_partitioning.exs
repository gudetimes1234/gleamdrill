defmodule Solution do
  def partition(s), do: build(String.graphemes(s))

  # Every partition starts with some palindromic prefix, so the choice at each
  # step is only how long that prefix is. Cutting there and recursing on the
  # rest reaches each partition exactly once, in order, with nothing to dedupe.
  defp build([]), do: [[]]

  defp build(remaining) do
    for size <- 1..length(remaining)//1,
        prefix = Enum.take(remaining, size),
        prefix == Enum.reverse(prefix),
        rest <- build(Enum.drop(remaining, size)),
        do: [Enum.join(prefix) | rest]
  end
end
