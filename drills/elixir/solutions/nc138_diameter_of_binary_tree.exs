defmodule Solution do
  # One walk, doing two jobs: each call returns its own height, and on the way
  # past it records the path *through* that node -- left height plus right
  # height. The answer is the largest such path, so it is never returned, only
  # tracked. That split between what a call returns and what it records is the
  # pattern worth keeping.
  def diameter_of_binary_tree(tree) do
    {_height, widest} = measure(tree)
    widest
  end

  defp measure(nil), do: {0, 0}

  defp measure({_value, left, right}) do
    {left_height, left_widest} = measure(left)
    {right_height, right_widest} = measure(right)

    {1 + max(left_height, right_height),
     Enum.max([left_height + right_height, left_widest, right_widest])}
  end
end
