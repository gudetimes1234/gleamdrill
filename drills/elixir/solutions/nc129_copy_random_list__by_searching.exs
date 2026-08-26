defmodule Solution do
  # The same translation without the map: for each link, search the list for the
  # node it names. O(n^2) against O(n), and the contrast is the lesson -- the
  # map is not an optimisation bolted on afterwards, it is the same lookup the
  # search does, paid for once instead of once per node.
  def copy_random_list(nodes) do
    Enum.map(nodes, fn {_id, value, random} ->
      {value, position_of(nodes, random, 0)}
    end)
  end

  defp position_of([], _id, _at), do: -1

  defp position_of([{id, _value, _random} | _rest], id, at), do: at

  defp position_of([_node | rest], id, at), do: position_of(rest, id, at + 1)
end
