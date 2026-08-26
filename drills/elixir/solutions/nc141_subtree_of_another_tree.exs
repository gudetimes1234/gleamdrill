defmodule Solution do
  # Try to match at every node. The two questions are kept apart on purpose:
  # "are these two trees identical" is the whole of the work, and "is it a
  # subtree" is that question asked once per node. O(n*m) in the worst case, and
  # a partial match that fails deep is what makes it so.
  def is_subtree(_root, nil), do: true
  def is_subtree(nil, _sub), do: false

  def is_subtree({_value, left, right} = root, sub) do
    same(root, sub) or is_subtree(left, sub) or is_subtree(right, sub)
  end

  defp same(nil, nil), do: true

  defp same({a, a_left, a_right}, {b, b_left, b_right}) do
    a == b and same(a_left, b_left) and same(a_right, b_right)
  end

  defp same(_first, _second), do: false
end
