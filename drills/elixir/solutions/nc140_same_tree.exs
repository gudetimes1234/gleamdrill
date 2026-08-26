defmodule Solution do
  # Walk both trees in step. Two empties match, an empty and a node never do,
  # and two nodes match when their values do and both pairs of children do.
  # Elixir's structural equality would answer this in one character -- the point
  # of writing it out is that the same shape is what Subtree of Another Tree and
  # Symmetric Tree are built from.
  def is_same_tree(nil, nil), do: true

  def is_same_tree({a, a_left, a_right}, {b, b_left, b_right}) do
    a == b and is_same_tree(a_left, b_left) and is_same_tree(a_right, b_right)
  end

  def is_same_tree(_first, _second), do: false
end
