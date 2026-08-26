defmodule Solution do
  def max_profit(prices) do
    {best, _memo} = from(0, length(prices), false, List.to_tuple(prices), %{})
    best
  end

  # The same three states as an explicit choice at each day: buy, sell, or do
  # nothing. After selling the recursion skips a day, which is the cooldown
  # stated where it happens rather than encoded in which value is read.
  defp from(day, n, _holding, _prices, memo) when day >= n, do: {0, memo}

  defp from(day, n, holding, prices, memo) do
    case Map.fetch(memo, {day, holding}) do
      {:ok, cached} ->
        {cached, memo}

      :error ->
        price = elem(prices, day)
        {waiting, memo} = from(day + 1, n, holding, prices, memo)

        {acting, memo} =
          if holding do
            {after_sale, memo} = from(day + 2, n, false, prices, memo)
            {price + after_sale, memo}
          else
            {after_buy, memo} = from(day + 1, n, true, prices, memo)
            {after_buy - price, memo}
          end

        best = max(waiting, acting)
        {best, Map.put(memo, {day, holding}, best)}
    end
  end
end
