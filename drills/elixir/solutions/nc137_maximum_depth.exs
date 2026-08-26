defmodule Solution do
  # One more than the deeper of the two children, with an empty tree at zero.
  # The whole problem is that base case: everything else is the definition of
  # depth read aloud.
  def max_depth(nil), do: 0
  def max_depth({_value, left, right}), do: 1 + max(max_depth(left), max_depth(right))
end
