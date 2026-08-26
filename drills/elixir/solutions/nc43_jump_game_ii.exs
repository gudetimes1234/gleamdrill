defmodule Solution do
  # Breadth-first search without a queue. Everything reachable in k jumps forms
  # a contiguous window; when the walk reaches that window's end, one more jump
  # is spent and the next window runs to the furthest index seen so far.
  def jump(nums) do
    n = length(nums)

    {jumps, _window_end, _furthest} =
      nums
      |> Enum.with_index()
      |> Enum.reduce({0, 0, 0}, fn {step, i}, {jumps, window_end, furthest} = state ->
        if i >= n - 1 do
          state
        else
          furthest = max(furthest, i + step)

          if i == window_end,
            do: {jumps + 1, furthest, furthest},
            else: {jumps, window_end, furthest}
        end
      end)

    jumps
  end
end
