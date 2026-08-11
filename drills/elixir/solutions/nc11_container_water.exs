defmodule Solution do
  def max_area(heights) do
    converge(heights, Enum.reverse(heights), length(heights) - 1, 0)
  end

  defp converge(_left, _right, width, best) when width <= 0, do: best

  defp converge([a | left], [b | right], width, best) do
    # Moving the taller line in can never help: the shorter one caps the area.
    best = max(best, min(a, b) * width)

    if a < b do
      converge(left, [b | right], width - 1, best)
    else
      converge([a | left], right, width - 1, best)
    end
  end
end
