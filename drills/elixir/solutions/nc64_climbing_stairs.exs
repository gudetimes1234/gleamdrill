defmodule Solution do
  # The last move was either one step or two, so the ways to reach step n are
  # the ways to reach n-1 plus the ways to reach n-2 -- Fibonacci with a
  # staircase painted on it. Only the last two values matter.
  def climb_stairs(n) do
    {_previous, current} =
      Enum.reduce(1..n//1, {0, 1}, fn _, {previous, current} ->
        {current, previous + current}
      end)

    current
  end
end
