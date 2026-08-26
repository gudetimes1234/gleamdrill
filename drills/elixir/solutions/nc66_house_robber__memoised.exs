defmodule Solution do
  def rob(nums) do
    {best, _memo} = from(0, List.to_tuple(nums), length(nums), %{})
    best
  end

  # The same choice written as a recursion from the front: rob this house and
  # skip the next, or skip this one. Exponential without the cache and linear
  # with it -- which is the lesson, since the rolling pair hides that the
  # problem ever had a tree of choices at all.
  defp from(index, _houses, count, memo) when index >= count, do: {0, memo}

  defp from(index, houses, count, memo) do
    case Map.fetch(memo, index) do
      {:ok, cached} ->
        {cached, memo}

      :error ->
        {taken, memo} = from(index + 2, houses, count, memo)
        {skipped, memo} = from(index + 1, houses, count, memo)
        best = max(elem(houses, index) + taken, skipped)
        {best, Map.put(memo, index, best)}
    end
  end
end
