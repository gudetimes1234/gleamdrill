defmodule Solution do
  def subsets_with_dup(nums), do: build(Enum.sort(nums))

  # Sorting puts equal values next to each other, which is what makes the
  # duplicate rule expressible: when the head is skipped, skip *every* copy of
  # it at once. Skipping one copy and keeping the next would rebuild the same
  # subset by a different route.
  defp build([]), do: [[]]

  defp build([first | rest]) do
    with_first = Enum.map(build(rest), &[first | &1])
    with_first ++ build(Enum.drop_while(rest, &(&1 == first)))
  end
end
