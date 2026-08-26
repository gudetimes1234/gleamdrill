defmodule Solution do
  @moduledoc """
  A tree is `nil` for empty, or `{value, left, right}` for a node.
  """

  # Swap the children, then invert each of them. The swap and the recursion are
  # the same line, which is why this is the shortest tree problem there is --
  # and why the order does not matter: swapping before or after recursing gives
  # the same tree.
  def invert_tree(nil), do: nil

  def invert_tree({value, left, right}), do: {value, invert_tree(right), invert_tree(left)}
end
