defmodule Solution do
  def jump(nums) when length(nums) <= 1, do: 0

  def jump(nums), do: walk(Enum.with_index(nums), length(nums) - 1, 0)

  # From the goal, step back to the *earliest* index that can reach it: taking
  # the earliest can never cost more jumps, and it is the only choice that is
  # obviously safe. O(n^2), and it makes the greedy argument visible.
  defp walk(_indexed, 0, jumps), do: jumps

  defp walk(indexed, goal, jumps) do
    case Enum.find(indexed, fn {step, i} -> i + step >= goal end) do
      {_step, index} -> walk(indexed, index, jumps + 1)
      nil -> jumps
    end
  end
end
