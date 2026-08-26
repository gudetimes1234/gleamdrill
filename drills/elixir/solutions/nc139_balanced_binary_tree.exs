defmodule Solution do
  # Height and balance in one walk. A subtree reports its height, or reports
  # that something below it is already unbalanced -- and once that happens
  # nothing above needs measuring at all. Using -1 as the "not balanced" height
  # is what lets a single return value carry both answers.
  def is_balanced(tree), do: measure(tree) >= 0

  defp measure(nil), do: 0

  defp measure({_value, left, right}) do
    left_height = measure(left)
    right_height = measure(right)

    if left_height < 0 or right_height < 0 or abs(left_height - right_height) > 1,
      do: -1,
      else: 1 + max(left_height, right_height)
  end
end
