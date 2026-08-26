defmodule Solution do
  # Rewrite the problem. If P is the set given a plus and N the set given a
  # minus, then P - N = target and P + N = total, so P = (total + target) / 2.
  # That turns a sign-assignment question into "how many subsets sum to a fixed
  # value" -- a knapsack, with no negative totals to track at all.
  def find_target_sum_ways(nums, target) do
    total = Enum.sum(nums)
    wanted = total + target

    if wanted < 0 or rem(wanted, 2) != 0 or total < abs(target) do
      0
    else
      goal = div(wanted, 2)

      nums
      |> Enum.reduce(%{0 => 1}, fn n, counts ->
        Enum.reduce(counts, counts, fn {reached, ways}, following ->
          if reached + n <= goal,
            do: Map.update(following, reached + n, ways, &(&1 + ways)),
            else: following
        end)
      end)
      |> Map.get(goal, 0)
    end
  end
end
