defmodule Solution do
  # The same merge with the recursion turned into a loop: build the answer
  # backwards in an accumulator and reverse once at the end. That accumulator is
  # the functional equivalent of the dummy head the imperative version keeps,
  # and reversing costs one extra pass rather than one extra frame per node.
  def merge_two_lists(first, second), do: Enum.reverse(step(first, second, []))

  defp step([], rest, merged), do: Enum.reduce(rest, merged, &[&1 | &2])
  defp step(rest, [], merged), do: Enum.reduce(rest, merged, &[&1 | &2])

  defp step([a | a_rest] = first, [b | b_rest] = second, merged) do
    if a <= b,
      do: step(a_rest, second, [a | merged]),
      else: step(first, b_rest, [b | merged])
  end
end
