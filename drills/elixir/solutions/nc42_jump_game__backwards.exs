defmodule Solution do
  def can_jump([]), do: true

  # Walk backwards carrying the leftmost index known to reach the end. Any index
  # that can reach *that* can reach the end, so it becomes the new goal.
  def can_jump(nums) do
    goal =
      nums
      |> Enum.with_index()
      |> Enum.reverse()
      |> Enum.reduce(length(nums) - 1, fn {jump, i}, goal ->
        if i + jump >= goal, do: i, else: goal
      end)

    goal == 0
  end
end
