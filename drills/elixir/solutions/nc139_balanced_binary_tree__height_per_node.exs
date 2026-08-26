defmodule Solution do
  # The definition read literally: every node's two sides differ by at most one,
  # and both sides are themselves balanced. It recomputes height at every node,
  # so the work is O(n^2) on a spindly tree -- the price of separating the two
  # questions the single-pass version answers together.
  def is_balanced(nil), do: true

  def is_balanced({_value, left, right}) do
    abs(height(left) - height(right)) <= 1 and is_balanced(left) and is_balanced(right)
  end

  defp height(nil), do: 0
  defp height({_value, left, right}), do: 1 + max(height(left), height(right))
end
