defmodule Solution do
  def change(amount, coins) do
    usable = Enum.filter(coins, &(&1 > 0))
    {ways, _memo} = from(usable, amount, %{})
    ways
  end

  # The same "combinations not permutations" rule stated as a choice instead of
  # a loop order: either use this coin again, or set it aside for good. Setting
  # it aside permanently is what fixes one order per combination.
  defp from(_coins, 0, memo), do: {1, memo}
  defp from([], _amount, memo), do: {0, memo}

  defp from([coin | rest] = coins, amount, memo) do
    key = {amount, length(coins)}

    case Map.fetch(memo, key) do
      {:ok, cached} ->
        {cached, memo}

      :error ->
        {using, memo} = if coin > amount, do: {0, memo}, else: from(coins, amount - coin, memo)
        {skipping, memo} = from(rest, amount, memo)
        {using + skipping, Map.put(memo, key, using + skipping)}
    end
  end
end
