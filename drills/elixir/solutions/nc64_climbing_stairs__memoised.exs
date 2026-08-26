defmodule Solution do
  def climb_stairs(n) do
    {answer, _memo} = ways(n, %{})
    answer
  end

  # The same recurrence from the top down, with a cache carried through the
  # recursion. Slower and heavier than the rolling pair, but it is the shape you
  # reach for first when the recurrence is not obviously a straight line -- and
  # the memo is the whole difference between O(n) and O(2^n).
  defp ways(n, memo) when n <= 1, do: {1, memo}

  defp ways(n, memo) do
    case Map.fetch(memo, n) do
      {:ok, cached} ->
        {cached, memo}

      :error ->
        {a, memo} = ways(n - 1, memo)
        {b, memo} = ways(n - 2, memo)
        {a + b, Map.put(memo, n, a + b)}
    end
  end
end
