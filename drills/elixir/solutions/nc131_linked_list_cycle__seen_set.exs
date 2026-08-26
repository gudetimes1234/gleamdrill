defmodule Solution do
  def has_cycle([]), do: false
  def has_cycle(next), do: walk(List.to_tuple(next), 0, MapSet.new())

  # Remember every node visited and stop when one repeats. Obvious, correct, and
  # O(n) memory -- which is the whole cost the two-walker version removes. Worth
  # writing once so that "constant space" means something specific afterwards.
  defp walk(_links, at, _seen) when at < 0, do: false

  defp walk(links, at, seen) do
    if MapSet.member?(seen, at),
      do: true,
      else: walk(links, elem(links, at), MapSet.put(seen, at))
  end
end
