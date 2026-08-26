defmodule Solution do
  # Pre-order names the root; in-order says how much of the rest belongs to each
  # side. Neither traversal alone determines a tree, and this is why together
  # they do -- the split point found in the in-order list is exactly the size of
  # the left subtree, which is what carves up the pre-order list too.
  def build_tree([], _inorder), do: nil

  def build_tree([root | rest], inorder) do
    left_size = Enum.find_index(inorder, &(&1 == root)) || 0
    {left_pre, right_pre} = Enum.split(rest, left_size)
    {left_in, right_in} = Enum.split(inorder, left_size)
    {root, build_tree(left_pre, left_in), build_tree(right_pre, Enum.drop(right_in, 1))}
  end
end
