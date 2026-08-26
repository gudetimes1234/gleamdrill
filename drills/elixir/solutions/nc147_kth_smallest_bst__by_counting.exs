defmodule Solution do
  # Count the left subtree and decide which way to go -- fewer than k on the
  # left means the answer is this node or to its right. It descends one path
  # instead of walking in order, and it is the version that adapts when the tree
  # stores its own subtree sizes, which turns the whole thing into O(depth).
  def kth_smallest(nil, _k), do: -1

  def kth_smallest({value, left, right}, k) do
    on_the_left = size(left)

    cond do
      k <= on_the_left -> kth_smallest(left, k)
      k == on_the_left + 1 -> value
      true -> kth_smallest(right, k - on_the_left - 1)
    end
  end

  defp size(nil), do: 0
  defp size({_value, left, right}), do: 1 + size(left) + size(right)
end
