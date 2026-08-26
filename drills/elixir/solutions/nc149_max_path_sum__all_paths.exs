defmodule Solution do
  # Every path through every node, measured outright: for each node, take the
  # best downward run on each side and add them. It recomputes those runs from
  # scratch at every node, so it is O(n^2) on a spindly tree -- the cost of
  # asking the two questions separately instead of returning both from one walk.
  def max_path_sum(tree) do
    case candidates(tree) do
      [] -> 0
      found -> Enum.max(found)
    end
  end

  defp candidates(nil), do: []

  defp candidates({value, left, right}) do
    through = value + max(downwards(left), 0) + max(downwards(right), 0)
    [through | candidates(left) ++ candidates(right)]
  end

  defp downwards(nil), do: 0

  defp downwards({value, left, right}) do
    value + Enum.max([downwards(left), downwards(right), 0])
  end
end
