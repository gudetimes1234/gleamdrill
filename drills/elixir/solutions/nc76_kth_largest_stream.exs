defmodule Solution do
  # Immutable, so the store is a value that add returns a new version of.
  def new(k, nums), do: {k, keep_top(nums, k)}

  # Only the k largest values can ever be the answer, so everything else is
  # thrown away on arrival. With a heap the discard is O(log k); a sorted list
  # is the same idea with a worse constant.
  def add({k, largest}, value), do: {k, keep_top([value | largest], k)}

  # The smallest of the k kept values is the kth largest -- but only once k of
  # them exist, which is why the count is checked rather than assumed.
  def kth({k, largest}) when length(largest) < k, do: nil
  def kth({_k, [smallest | _]}), do: smallest

  defp keep_top(values, k) do
    values |> Enum.sort(:desc) |> Enum.take(k) |> Enum.sort()
  end
end
