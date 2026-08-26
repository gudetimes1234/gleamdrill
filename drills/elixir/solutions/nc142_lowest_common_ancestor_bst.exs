defmodule Solution do
  # The ordering does all the work. If both targets are below the current value
  # go left, if both are above go right, and otherwise this node is the split
  # point -- which is the answer. No searching for either node first, and no
  # comparing of paths.
  def lowest_common_ancestor(nil, _p, _q), do: -1

  def lowest_common_ancestor({value, left, right}, p, q) do
    cond do
      p < value and q < value -> lowest_common_ancestor(left, p, q)
      p > value and q > value -> lowest_common_ancestor(right, p, q)
      true -> value
    end
  end
end
