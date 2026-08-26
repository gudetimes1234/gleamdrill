defmodule Solution do
  def can_partition(nums) do
    total = Enum.sum(nums)

    if rem(total, 2) != 0 do
      false
    else
      {answer, _memo} = reachable(List.to_tuple(nums), 0, div(total, 2), %{})
      answer
    end
  end

  # Take this number or leave it, keyed by how much is still owed and how far
  # along the list we are. Written as a recursion it is obviously a search over
  # subsets; the cache is what stops it enumerating all 2^n of them.
  defp reachable(_nums, _index, 0, memo), do: {true, memo}

  defp reachable(nums, index, owed, memo) when index >= tuple_size(nums) or owed < 0,
    do: {false, memo}

  defp reachable(nums, index, owed, memo) do
    case Map.fetch(memo, {index, owed}) do
      {:ok, cached} ->
        {cached, memo}

      :error ->
        {taken, memo} = reachable(nums, index + 1, owed - elem(nums, index), memo)

        {answer, memo} =
          if taken, do: {true, memo}, else: reachable(nums, index + 1, owed, memo)

        {answer, Map.put(memo, {index, owed}, answer)}
    end
  end
end
