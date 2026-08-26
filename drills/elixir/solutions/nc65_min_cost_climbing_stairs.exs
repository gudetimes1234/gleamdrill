defmodule Solution do
  # Cost to stand on each step, carried forward: getting here means having paid
  # for one of the two steps below, whichever was cheaper. Two variables again,
  # because nothing older than two steps back can matter.
  def min_cost_climbing_stairs(cost) do
    {one_back, two_back} =
      Enum.reduce(cost, {0, 0}, fn price, {one_back, two_back} ->
        {price + min(one_back, two_back), one_back}
      end)

    min(one_back, two_back)
  end
end
