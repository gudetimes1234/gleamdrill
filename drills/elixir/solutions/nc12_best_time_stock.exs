defmodule Solution do
  def max_profit(prices) do
    {_lowest, profit} =
      Enum.reduce(prices, {nil, 0}, fn price, {lowest, profit} ->
        lowest = if lowest == nil, do: price, else: min(lowest, price)
        {lowest, max(profit, price - lowest)}
      end)

    profit
  end
end
