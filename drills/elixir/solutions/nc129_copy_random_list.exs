defmodule Solution do
  @moduledoc """
  Nodes arrive as {id, value, random_id}, where the ids are arbitrary and a
  random_id of -1 means no link. The copy is returned as {value, random} with
  random naming a *position* in the copy, or -1 -- so producing it means
  translating every id into the place the copied node ended up.
  """

  # One pass to learn where each original node lands, a second to resolve the
  # links. Trying to resolve a link on first sight cannot work: it may point at
  # a node not yet seen, which is the whole difficulty of the problem, and a map
  # from old node to new is what removes it.
  def copy_random_list(nodes) do
    places =
      nodes
      |> Enum.with_index()
      |> Map.new(fn {{id, _value, _random}, i} -> {id, i} end)

    Enum.map(nodes, fn {_id, value, random} ->
      {value, Map.get(places, random, -1)}
    end)
  end
end
