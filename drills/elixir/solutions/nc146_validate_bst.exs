defmodule Solution do
  # Check against a range, not against the parent. A node can be larger than its
  # own parent and still break the order, because the constraint comes from an
  # ancestor further up -- and that is the whole difficulty. Going left tightens
  # the upper bound, going right the lower one.
  def is_valid_bst(tree), do: within(tree, nil, nil)

  defp within(nil, _low, _high), do: true

  defp within({value, left, right}, low, high) do
    above?(value, low) and below?(value, high) and
      within(left, low, value) and within(right, value, high)
  end

  defp above?(_value, nil), do: true
  defp above?(value, low), do: value > low

  defp below?(_value, nil), do: true
  defp below?(value, high), do: value < high
end
