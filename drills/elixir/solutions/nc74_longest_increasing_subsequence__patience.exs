defmodule Solution do
  # Patience sorting. Keep the smallest value that any subsequence of each
  # length ends with; that list is always sorted, so each number either extends
  # it or replaces the first entry it is no bigger than. The list is not the
  # answer subsequence -- only its length is meaningful.
  def length_of_lis(nums) do
    nums
    |> Enum.reduce([], &place(&2, &1, []))
    |> length()
  end

  defp place([], n, seen), do: Enum.reverse([n | seen])

  defp place([first | rest], n, seen) do
    if first >= n,
      do: Enum.reverse([n | seen]) ++ rest,
      else: place(rest, n, [first | seen])
  end
end
