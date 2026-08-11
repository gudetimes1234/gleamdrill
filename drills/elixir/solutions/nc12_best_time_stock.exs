defmodule Solution do
  def max_profit(prices) do
    # Carry the cheapest day seen so far; today's best sale is against that.
    {_lowest, profit} =
      Enum.reduce(prices, {nil, 0}, fn price, {lowest, profit} ->
        lowest = if lowest == nil, do: price, else: min(lowest, price)
        {lowest, max(profit, price - lowest)}
      end)

    profit
  end
end
