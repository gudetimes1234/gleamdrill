defmodule Solution do
  @impossible -1_000_000_000

  # Three states rather than one number: holding a share, having just sold (so
  # today is the cooldown), and free to act. Each day's states depend only on
  # yesterday's, so the whole thing is three rolling values -- and the cooldown
  # is expressed simply by "free" never reading "sold" from the same day.
  def max_profit(prices) do
    {_hold, sold, rest} =
      Enum.reduce(prices, {@impossible, @impossible, 0}, fn price, {hold, sold, rest} ->
        {max(hold, rest - price), hold + price, max(rest, sold)}
      end)

    max(max(sold, rest), 0)
  end
end
