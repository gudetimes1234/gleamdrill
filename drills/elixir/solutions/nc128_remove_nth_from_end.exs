defmodule Solution do
  # Two walkers n apart. When the leading one runs off the end, the trailing one
  # is sitting on the node to drop -- the length is never computed, which is the
  # point: one pass instead of two. Opening the gap can fail, and that failure
  # is exactly the "n is longer than the list" case.
  def remove_nth_from_end(values, n) do
    case skip(values, n) do
      :too_short -> values
      ahead -> advance(values, ahead, [])
    end
  end

  defp skip(rest, 0), do: rest
  defp skip([], _n), do: :too_short
  defp skip([_ | rest], n), do: skip(rest, n - 1)

  defp advance([value | behind], [_ | ahead], kept), do: advance(behind, ahead, [value | kept])
  # The leading walker is spent, so the trailing one is on the doomed node.
  defp advance([_dropped | rest], [], kept), do: Enum.reverse(kept) ++ rest
  defp advance([], _ahead, kept), do: Enum.reverse(kept)
end
