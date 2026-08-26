defmodule Solution do
  # An in-order walk of a search tree visits the values in order, so the answer
  # is the kth thing it reaches. Stopping there is the point: the tree below the
  # kth value is never touched, which is what separates this from sorting
  # everything.
  def kth_smallest(tree, k) do
    case take(tree, k) do
      {:found, value} -> value
      {:remaining, _left} -> -1
    end
  end

  defp take(nil, k), do: {:remaining, k}

  defp take({value, left, right}, k) do
    case take(left, k) do
      {:found, found} -> {:found, found}
      {:remaining, 1} -> {:found, value}
      {:remaining, left_over} -> take(right, left_over - 1)
    end
  end
end
