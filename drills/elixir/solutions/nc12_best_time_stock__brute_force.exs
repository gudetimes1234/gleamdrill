defmodule Solution do
  def max_profit(prices) do
    # Every buy day against every later sell day. O(n^2), and the problem
    # statement written out.
    indexed = Enum.with_index(prices)

    profits =
      for {buy, i} <- indexed,
          {sell, j} <- indexed,
          j > i,
          do: sell - buy

    Enum.max([0 | profits])
  end
end
