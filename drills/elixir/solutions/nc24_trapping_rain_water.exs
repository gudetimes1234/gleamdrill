defmodule Solution do
  def trap(height) do
    walk(height, Enum.reverse(height), length(height) - 1, 0, 0, 0)
  end

  # The two pointers are the list read from the front and the list read from the
  # back; `remaining` stands in for "left < right", since neither end knows
  # where the other has got to.
  defp walk(_front, _back, remaining, _left_max, _right_max, total)
       when remaining <= 0,
       do: total

  defp walk([l | front_rest] = front, [r | back_rest] = back, remaining, left_max, right_max, total) do
    if l < r do
      left_max = max(left_max, l)
      walk(front_rest, back, remaining - 1, left_max, right_max, total + left_max - l)
    else
      right_max = max(right_max, r)
      walk(front, back_rest, remaining - 1, left_max, right_max, total + right_max - r)
    end
  end
end
