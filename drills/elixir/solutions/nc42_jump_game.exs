defmodule Solution do
  # Only one number matters: the furthest index reachable so far. Walk forward
  # and extend it; the moment the walk gets past it, nothing further is
  # reachable and the value stops changing.
  def can_jump(nums) do
    reach =
      nums
      |> Enum.with_index()
      |> Enum.reduce(0, fn {jump, i}, reach ->
        if i > reach, do: reach, else: max(reach, i + jump)
      end)

    reach >= length(nums) - 1
  end
end
