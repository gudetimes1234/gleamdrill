defmodule Solution do
  def max_profit(prices) do
    indexed = Enum.with_index(prices)

    profits =
      for {buy, i} <- indexed,
          {sell, j} <- indexed,
          j > i,
          do: sell - buy

    Enum.max([0 | profits])
  end
end
