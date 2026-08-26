defmodule Solution do
  # The same recurrence read the other way: instead of "what did it cost to get
  # here", ask "what will it cost to finish from here". Walking backwards, the
  # answer at each step is its own price plus the cheaper of the two ahead, and
  # the start is the better of the first two.
  def min_cost_climbing_stairs(cost) do
    {one_ahead, two_ahead} =
      cost
      |> Enum.reverse()
      |> Enum.reduce({0, 0}, fn price, {one_ahead, two_ahead} ->
        {price + min(one_ahead, two_ahead), one_ahead}
      end)

    min(one_ahead, two_ahead)
  end
end
