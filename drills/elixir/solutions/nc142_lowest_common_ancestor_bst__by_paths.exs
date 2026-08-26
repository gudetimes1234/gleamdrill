defmodule Solution do
  # Find the path from the root to each target, then take the last node they
  # share. It ignores the ordering entirely, which is why it is the version that
  # also works on a plain binary tree -- at the cost of two searches and two
  # stored paths rather than one walk and nothing.
  def lowest_common_ancestor(tree, p, q) do
    tree
    |> path(p)
    |> Enum.zip(path(tree, q))
    |> Enum.reduce_while(-1, fn {a, b}, best ->
      if a == b, do: {:cont, a}, else: {:halt, best}
    end)
  end

  defp path(nil, _target), do: []
  defp path({target, _left, _right}, target), do: [target]

  defp path({value, left, right}, target) do
    case path(left, target) do
      [] ->
        case path(right, target) do
          [] -> []
          found -> [value | found]
        end

      found ->
        [value | found]
    end
  end
end
